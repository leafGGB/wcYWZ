<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="btn-img" @tap="records">
					<image :src="this.toc" mode=""></image>
				</view>
				<textarea auto-height="true" class="chat-send btn inputs" v-show="!isRecoed" @input="inputs" v-model="msg"></textarea>
				<view class="record btn" v-show="isRecoed">按住说话</view>
				<!-- 表情 -->
				<view class="btn-img" @tap="emoji">
					<image src="../../static/image/submit/face.png" mode=""></image>
				</view>
				<!-- 加号功能 -->
				<view class="btn-img"  @tap="featBtn">
					<image src="../../static/image/submit/addition.png" mode=""></image>
				</view>
				<view class="sendBtn btn" @tap="sendMsg" v-show="isSendBtn">
					发送
				</view>
			</view>
			<view class="emoji" v-show="isEmoji">
				表情
			</view>
			<view class="feat" v-show="featModule" @tap="feat">
				
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				
				<view class="position">
					<view class="positionIcon"></view>
					<view class="text">位置</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
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
		methods: {
			// 文字/语音切换
			records: function() {
				if (this.isRecoed) {
					this.isRecoed = false;
					this.toc = '../../static/image/submit/voice.png'
				} else {
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
				e.preventDefault()
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
					this.emoji()
				}, 0)
			},
			
			// 点击功能按键
			featBtn:function(){
				this.featModule =!this.featModule ;
				console.log("功能按键");
				setTimeout(() => {
					this.getElementHeight();
				}, 0)
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
			// flex:auto;
			line-height:28rpx;
			width: 110rpx;
			height: 28rpx;
			background-color: limegreen;
			color:white;
			margin:8rpx 10rpx;
			text-align: center;
			
		}
	}
	
	.emoji{
		width:100%;
		height:460rpx;
		background : rgba(236,237,238,1);
		box-shadow:0px -1rpx 0px 0px rgba(0,0,0,0.1);
	}
	
	.feat{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width:100%;
		height:460rpx;
		background : rgba(236,237,238,1);
		box-shadow:0px -1rpx 0px 0px rgba(0,0,0,0.1);
		.position{
			margin: 30rpx 30rpx;
			flex:1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			
			.positionIcon{
				width: 100rpx;
				height: 100rpx;
				background-color: #fff;
				border-radius:28rpx;
				text-align: center;
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
