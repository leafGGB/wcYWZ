<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<!-- 语音 -->
				<view class="btn-img" @tap="records">
					<image :src="this.toc" mode=""></image>
				</view>
				<textarea auto-height="true" class="chat-send btn inputs" v-show="!isRecoed" @input="inputs" v-model="msg" @focus="focus"></textarea>
				<view class="record btn" v-show="isRecoed">按住说话</view>
				<!-- 表情 -->
				<view class="btn-img" @tap="emoji">
					<image src="../../static/image/submit/face.png" mode=""></image>
				</view>
				<!-- 加号功能 -->
				<view class="btn-img"  @tap="featBtn" v-show="isFeat">
					<image src="../../static/image/submit/addition.png" mode=""></image>
				</view>
					<view class="sendBtn btn" @tap="sendMsg" v-show="isSendBtn">
						发送
					</view>
			</view>
			<view class="emoji" v-show="isEmoji">
				<emoji @emotion="emotion"></emoji>
				<!-- 删除按钮 -->
				<view class="deleteBtn" @tap="deleteMsg">
					X
				</view>
			</view>
			<view v-show="featModule" @tap="feat">
				<!-- 功能展示模块 -->
				<view class="feat">
					<view class="photo common" @tap="sendImage('album')">
						<view class="icon">
							<image src="../../static/image/submit/photo.png" mode=""></image>
						</view>
						<view class="text">图片</view>
					</view>
					
					<view class="shoot common" @tap="sendImage('camera')">
						<view class="icon">
							<image src="../../static/image/submit/shoot.png" mode=""></image>
						</view>
						<view class="text">拍摄</view>
					</view>
					
					<view class="location common">
						<view class="icon">
							<image src="../../static/image/submit/location.png" mode=""></image>
						</view>
						<view class="text">位置</view>
					</view>
					
					<view class="video common">
						<view class="icon">
							<image src="../../static/image/submit/video.png" mode=""></image>
						</view>
						<view class="text">视频</view>
					</view>
					
					<view class="file common">
						<view class="icon">
							<image src="../../static/image/submit/file.png" mode=""></image>
						</view>
						<view class="text">文件</view>
					</view>
					
					
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from '../emoji/emoji.vue'
	export default {
		data() {
			return {
				isRecoed: false,
				isEmoji: false,
				msg: '',
				toc: '../../static/image/submit/voice.png',
				isFeat:true,//右侧功能键
				isSendBtn:false,//发送信息按钮
				featModule:false,//功能模块显示与否
			};
		},
		components:{
			emoji
		},
		methods: {
			
			// 文字/语音切换
			records: function() {
				if (this.isRecoed) {
					
					this.isRecoed = false;
					this.toc = '../../static/image/submit/voice.png'
				} else {
					if(this.featModule)this.featModule=false
					this.isEmoji = false;
					setTimeout(() => {
						this.getElementHeight();
					}, 0)
					this.isRecoed = true;
					this.toc = '../../static/image/submit/voicePlay2.png'
				}
			},
			
			// 获取模块高度
			getElementHeight: function() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('height', data.height);
				}).exec();
			},
			
			// 表情
			emoji: function() {
				if(this.featModule)this.featModule=false
				if(this.isRecoed){
					this.isRecoed=false
					this.toc = '../../static/image/submit/voice.png'
				}
				this.isEmoji = !this.isEmoji;
				setTimeout(() => {
					this.getElementHeight();
				}, 0)
			},
			
			// 功能
			feat:function(){
				this.isFeat = !this.isFeat;
				setTimeout(() => {
					this.getElementHeight();
				}, 0)
			},
			
			//文字发送
			inputs: function(e) {
				var chatm = e.detail.value;
				if(chatm.length){
					this.isFeat=false;
					this.isSendBtn=true;
				}else{
					this.isFeat=true;
					this.isSendBtn=false;
				}
			},
			
			// 发送信息
			sendMsg:function(){
				this.$emit('inputs', this.msg);
				setTimeout(() => {
					this.msg = '';
					this.isFeat=true;
					this.isSendBtn=false;
				}, 0)
			},
			
			// 点击功能按键
			featBtn:function(){
				if(this.isEmoji)this.isEmoji=false
				this.featModule =!this.featModule ;
				setTimeout(() => {
					this.getElementHeight();
				}, 0)
			},
			
			emotion:function(i){
				this.msg+=i
				if(i.length){
					this.isFeat=false;
					this.isSendBtn=true;
				}else{
					this.isFeat=true;
					this.isSendBtn=false;
				}
			},
			
			// 删除按钮
			deleteMsg:function(){
				if(this.msg){
					this.msg=this.msg.substring(0,this.msg.length-1)//从第0位开始，切割字符串-1的信息
				}
				
				if(this.msg.length===0){
					this.isSendBtn=false
					this.isFeat=true
				}
			},
			
			// 输入框聚焦的时候
			focus:function(){
				this.isEmoji=false
				this.featModule=false
				setTimeout(() => {
					this.getElementHeight();
				}, 0)
			},
			
			
			// 发送图片
			sendImage:function(e){
				let count;
				if(e==='album'){
					count=9
				}else{
					count=1;
				}
				uni.chooseImage({
					count: count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [e], //从相册选择
					success: (res)=> {
						// console.log(JSON.stringify(res.tempFilePaths));
						const filePaths=res.tempFilePaths;
						console.log(filePaths,'filepaths');
						for(let i=0;i<filePaths.length;i++){
							this.send(filePaths[i],1)
						}
						
					}
				});
			},
			// 发送
			send:function(msg,type){
				let data={
					message:msg,
					types:type//type1为图片类型
				}
				this.$emit('inputs',data);
				setTimeout(()=>{
					this.msg=''; 
				},0)
			}
			

		}
	}
</script>

<style lang="scss">
	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: var(--status-bar-height);
	}
	
	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;
		image {
			width: 66rpx;
			height: 66rpx;
			margin: 0 10rpx;
			flex: auto;
		}
		.btn {
			flex: auto;
			background-color:#fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 5rpx 10rpx;
		}
		// 按住说话
		.record{
			text-align: center;
			font-size: $uni-font-size-lg;
			color:$uni-text-color-grey;
		}
		.sendBtn{
			flex:auto;
			line-height:28rpx;
			width: 140rpx;
			height: 28rpx;
			background-color: limegreen;
			color:white;
			margin:8rpx 10rpx;
			text-align: center;
			transition: opacity 2s;
		}
	}
	
	.emoji{
		position:relative;
		width:100%;
		height:460rpx;
		background : rgba(236,237,238,1);
		box-shadow:0px -1rpx 0px 0px rgba(0,0,0,0.1);
		.deleteBtn{
			position:absolute;
			bottom:38rpx;
			right:16rpx;
			background-color: white;
			width: 116rpx;
			height:86rpx;
			line-height:86rpx;
			text-align:center;
			border-radius: 20rpx;
			box-shadow: 0px -1rpx 0px 0px rgba(0,0,0,0.1);
			
		}
	}

	.feat{
			display: flex;
			// align-items:  flex-end;
			// justify-content: flex-start;
			flex-wrap:wrap;
			box-sizing: border-box;
			width:100%;
			height:460rpx;
			background : rgba(236,237,238,1);
			box-shadow:0px -1rpx 0px 0px rgba(0,0,0,0.1);
			// text-align: center;
			padding:20rpx;
			
			.common{
				padding: 30rpx 30rpx;
				flex:1;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			
				
				.icon{
					width: 100rpx;
					height: 100rpx;
					background-color: #fff;
					border-radius:28rpx;
					line-height: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 60rpx;
						height: 60rpx;
						
					}
				}
				.text{
					font-size:28rpx;
					text-align: center;
					margin-top: 10rpx;
					color:gray;
				}
				
					
			
			
			}
			}
	</style>
	
</style>
