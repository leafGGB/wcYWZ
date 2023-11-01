<template>
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
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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
