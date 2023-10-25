<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="goBack">
				<image class="back-img" src="../../static/image/common/back.png" mode=""></image>
			</view>
			<view class="tap-bar-right">
				<view class="more-img">
					<image src="../../static/image/userHome/more.png"></image>
				</view>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bai" :animation="animationData5"></view>
			<image class="bg-img" src="../../static/image/index/R-C.png" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :animation="animationData4">
					<image src="../../static/image/userHome/male.png" mode=""></image>
				</view>
				<image class="user-img" src="../../static/image/index/R-C.png" mode="aspectFill" :animation="animationData3"></image>
			</view>
			<view class="user-imf">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称：{{user.nick}}</view>
				<view class="intf">{{user.intf}}</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="add-btn btn1" @tap="addFriendAnimat">添加好友</view>
		</view>
		<view class="add-misg" :style="{height:addHeight + 'px',bottom:-+addHeight + 'px'}" :animation="animationData">
			<view class="name">{{user.name}}</view>
			<textarea :value="myname+'请求添加好友'" class="add-main" maxlength="100"></textarea>
		</view>
		<view class="addConfirm-btn" :animation="animationData2">
			<view class="close" @tap="addFriendAnimat">取消</view>
			<view class="send">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myname: "wc有蚊子",
				user: {
					name: 'GGB',
					nick: 'wc有蚊子',
					intf: '哈哈哈红红火火恍恍惚惚红红火火恍恍惚惚哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈'
				},
				addHeight: '',         // add板块高度
				animationData: {},     // 添加好友动画
				animationData2: {},     // 添加好友动画
				animationData3: {},     // 添加好友动画
				animationData4: {},     // 添加好友动画
				animationData5: {},     // 添加好友动画
				isAdd: false,          // 确定添加还是取消添加   
			};
		},
		onReady: function() {
			this.getElementStyle();
		},
		methods: {
			// 返回到首页
			goBack: function() {
				uni.navigateBack({
					delta: 1,
				})
			},
			
			// 获取页面高度
			getElementStyle: function() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					this.addHeight = data.height-186;
				}).exec();
			},
			
			// 添加好友动画
			addFriendAnimat: function() {
				this.isAdd = !this.isAdd;
				var animation = uni.createAnimation({
					duration: 300,
				    timingFunction: 'ease',
				})
				var animation2 = uni.createAnimation({
					duration: 300,
				    timingFunction: 'ease',
				})
				var animation3 = uni.createAnimation({
					duration: 300,
				    timingFunction: 'ease',
				})
				var animation4 = uni.createAnimation({
					duration: 300,
				    timingFunction: 'ease',
				})
				var animation5 = uni.createAnimation({
					duration: 300,
				    timingFunction: 'ease',
				})
				if (this.isAdd) {
					animation.bottom(0).step();
					animation2.bottom(0).step();
					animation3.width(120).height(120).step();
					animation4.opacity(0).step();
					animation5.backgroundColor('rgba(138,188,209,1)').step();
				} else {
					animation.bottom(-this.addHeight).step();
					animation2.bottom(-100).step();
					animation3.width().height().step();
					animation4.opacity(1).step();
					animation5.backgroundColor('rgba(255,228,49,0)').step();
				}
				
				this.animationData = animation.export();
				this.animationData2 = animation2.export();
				this.animationData3 = animation3.export();
				this.animationData4 = animation4.export();
				this.animationData5 = animation5.export();
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/common.scss";

	.content {
		padding-top: var(--status-bar-height);
	}
	
	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1001;
		height: 88rpx;
		width: 100%;
		padding-top: var(--status-bar-height);
		background: $uni-bg-color;
		border-bottom: 1px solid $uni-border-color;
		
		.top-bar-left {
			float: left;
			padding-left: 32rpx;
			width: 88rpx;
			height: 88rpx;
			
			.text {
				font-size: $uni-font-size-lg;
				font-weight: 700;
				color: $uni-text-color;
				line-height: 88rpx;
			}
			.back-img {
				margin-top: 21rpx;
				width: 52rpx;
				height: 52rpx;
			}
		}
		
		.more-img {
			padding-top: 10rpx;
			padding-right: $uni-spacing-col-base;
			image {
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
	
	.bg {
		position: fixed;
		z-index: -2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg-bai {
			width: 100%;
			height: 100%;
			// background-color: #eee;
		}
		.bg-img {
			position: absolute;
			left: 10rpx;
			top: -10rpx;
			width: 100%;
			height: 100%;
			filter: blur(16px);
			opacity: 0.4;
			z-index: -1;
		}
	}
	
	.main {
		text-align: center;
		padding-top: 240rpx;
		.user-header {
			position: relative;
			margin: 0 auto;
			width: 412rpx;
			height: 412rpx;
			.sex {
				position: absolute;
				bottom: 12rpx;
				right: 16rpx;
				width: 64rpx;
				height: 64rpx;
				z-index: 11;
				// background: rgba(255, 93, 91, 1);
				border-radius: $uni-border-radius-circle;
				image {
					width: 62rpx;
					height: 62rpx;
				}
			}
			.user-img {
				z-index: 1;
				top: 0;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255, 255, 255, 1);
				box-shadow: 0px 36rpx 40rpx 0rpx rgba(39, 40, 50, 0.1);
			}
		}
		
		.user-imf {
			padding-top: 42rpx;
			.name {
				font-size: 52rpx;
				color: $uni-text-color;
				line-height: 74rpx;
			}
			.nick {
				font-size: $uni-font-size-base;
				line-height: 40rpx;
				color: $uni-text-color;
			}
			.intf {
				padding: 20rpx 100rpx;
				font-size: $uni-font-size-base;
				font-weight: 300;
				color: $uni-text-color;
				line-height: 48rpx;
			}
		}
	}
	
	.bottom-bar{
		.add-btn{
			background: $uni-color-primary;
			margin: 0 $uni-spacing-col-base;
		}
	}
	
	.add-misg {
		position: fixed;
		bottom: 0;
		width: 100%;
		// height: 1252rpx;
		padding: 0 56rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		border-radius: 40rpx 40rpx 0px 0px;
		
		.name {
			padding: 168rpx 0 40rpx;
			font-size: 52rpx;
			color: $uni-text-color;
			line-height: 74rpx;
		}
		
		.add-main {
			padding: 18rpx 22rpx;
			box-sizing: border-box;
			width: 100%;
			height: 270rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-text-color;
			color: $uni-text-color-grey;
			line-height: 44rpx;
		}
	}
	
	.addConfirm-btn {
		position: fixed;
		bottom: -244rpx;
		width: 100%;
		height: 104rpx;
		// padding-bottom: 120rpx;
		box-sizing: border-box;
		padding: 12rpx $uni-spacing-col-base 140rpx;
		z-index: 100;
		height: 104rpx;
		// padding-bottom: 120rpx;
		display: flex;
		.close {
			// flex: 1;
			width: 172rpx;
			text-align: center;
			line-height: 80rpx;
			// width: 684rpx;
			height: 80rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			background: $uni-bg-color-hover;
			border-radius: $uni-border-radius-sm;
		}
		.send {
			flex: auto;
			margin-left: $uni-spacing-col-base;
			text-align: center;
			line-height: 80rpx;
			height: 80rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			background: $uni-color-primary;
			border-radius: $uni-border-radius-sm;
		}
	}
</style>
