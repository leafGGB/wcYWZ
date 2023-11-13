<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right" @tap="toSignUp">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/image/index/logo.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">欢迎欢迎，热烈欢迎</view>
			<view class="inputs">
				<input class="user" type="text" @blur="getUser" placeholder="用户名/邮箱" placeholder-style="color:#aaa;font-weight:400;">
				<input class="psw" type="password" @blur="getPsw" placeholder="密码" placeholder-style="color:#aaa;font-weight:400;">
			</view>
			<view class="tips">用户名或密码为空或错误</view>
		</view>
		<view class="submit" @tap="login">登录</view>
	</view>
</template>

<script>
import datas from '../../commons/js/datas';
	export default {
		data() {
			return {
				user: '',
				password: '',
			};
		},
		methods: {
			// 后台链接测试
			
			// 跳转到注册页面
			toSignUp: function() {
				uni.navigateTo({
					url: '/pages/signup/signup',
				})
			},
			
			// 获取用户名/邮箱
			getUser: function(e) {
				this.user = e.detail.value;
			},
			// 获取密码
			getPsw: function(e) {
				this.password = e.detail.value;
			},
			
			// 登录提交
			login() {
				// if (this.user && this.password) {
				// 	console.log("提交成功");
				// }
				uni.request({
					url: 'http://192.168.3.15:3000/signup/add',
					data: {
						mail: '12345679@qq.com',
						name: '小米',
						password: '12345678'
					},
					method: 'POST',
					success: (data) => {
						console.log(data);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.content {
	// display: flex;
	// flex-direction: column;
	// align-items: center;
	// justify-content: center;
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
	
	.top-bar-right {
		float: right;
		padding-right: 32rpx;
		
		.text {
			font-size: $uni-font-size-lg;
			font-weight: 700;
			color: $uni-text-color;
			line-height: 88rpx;
		}
	}
}

.logo  {
	text-align: center;
	image {
		padding-top: 256rpx;
		width: 148rpx;
		height: 152rpx;
		margin: 0 auto;
	}
	
}

.main {
	padding: 54rpx $uni-spacing-col-lg 120rpx;
	// width: 100%;
	
	.title {
		font-size: 56rpx;
		font-weight: 700;
		color: $uni-text-color;
		line-height: 80rpx;
	}
	.slogan {
		font-size: 40rpx;
		color: $uni-text-color-grey;
		line-height: 56rpx;
	}
	.inputs {
		padding-top: 8rpx;
		input {
			padding-top: 30rpx;
			height: 88rpx;
			font-size: $uni-font-size-lg;
			font-weight: 700;
			color: $uni-text-color;
			line-height: 88rpx;
			border-bottom: 1px solid $uni-border-color;
		}
	}
	.tips {
		float: left;
		font-size: $uni-font-size-lg;
		color: $uni-color-warning;
		line-height: 56rpx;
	}
}

.submit {
	margin: 0 auto;
	width: 520rpx;
	height: 96rpx;
	// background: $uni-color-primary;
	background-image:linear-gradient(120deg,#a1c4fd 0%, #c2e9fb 100%);
	box-shadow: 0px 50rpx 32rpx -36rpx rgba(177, 214, 252, 0.8);
	border-radius: 48rpx;
	font-size: $uni-font-size-lg;
	font-weight: 700;
	color: $uni-text-color;
	line-height: 96rpx;
	text-align: center;
	
	&:active {
		box-shadow: 0px 50rpx 32rpx -36rpx rgba(177, 214, 252, 0.8);
		box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.3), inset -4px -4px 4px rgba(233, 244, 255, 0.5);
	}
}
</style>
