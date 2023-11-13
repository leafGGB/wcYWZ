<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="goBack">
				<image class="back-img" src="../../static/image/common/back.png" mode=""></image>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/image/index/logo.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">注册</view>
			<view class="inputs">
				<view class="inputs-div">
					<input class="user" type="text" placeholder="用户名" @input="getUser" placeholder-style="color:#aaa;font-weight:400;">
					<view class="employ" v-show="userEmploy">已被占用</view>
					<image class="ok" v-show="isuser" src="../../static/image/sign/ok.png"></image>
				</view>
				<view class="inputs-div">
					<input class="email" type="text" placeholder="邮箱" @input="existEmail" placeholder-style="color:#aaa;font-weight:400;">
					<view class="employ" v-show="emailEmploy">已被占用</view>
					<view class="invalid" v-show="invalid">邮箱无效</view>
					<image class="ok" v-show="isemail" src="../../static/image/sign/ok.png"></image>
				</view>
				<view class="inputs-div">
					<input class="psw" :type="type" placeholder="密码" @input="getPsw" placeholder-style="color:#aaa;font-weight:400;">
					<image class="look" @tap="looks" :src="lookUrl"></image>
				</view>
			</view>
		</view>
		<view :class="checkAll ? 'active' : 'inertia'">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'password',
				isuser: true,       // 用户名是否可用
				isemail: true,     // 邮箱是否可用
				islook: false,      // 是否显示密码
				invalid: false,     // 邮箱是否符合
				userEmploy: false,      // 用户名是否被占用
				emailEmploy: false,      // 邮箱是否被占用
				lookUrl: '../../static/image/sign/nolook.png',
				email: '',          // 邮箱
				user: '',           // 用户名
				password: '',       // 密码
				checkAll: false,
			};
		},
		methods: {
			// 密码显示隐藏
			looks: function() {
				if (this.look) {
					this.type = "password";
					this.look = !this.look;
					this.lookUrl = '../../static/image/sign/nolook.png'
				} else {
					this.type = "text";
					this.look = !this.look;
					this.lookUrl = '../../static/image/sign/look.png'
				}
			},
			
			// 判断邮箱格式
			existEmail: function(e) {
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				this.email = e.detail.value;
				if (this.email.length > 0) {
					if (reg.test(this.email)) {
						this.invalid = false;
					} else {
						this.invalid = true;
					}
				}
				this.register();
			},
			
			// 获取用户名
			getUser: function(e) {
				this.user = e.detail.value;
				this.register();
			},
			// 获取密码
			getPsw: function(e) {
				this.password = e.detail.value;
				this.register();
			},
			
			// 是否可以注册
			register: function() {
				if (this.isuser && this.isemail && this.password.length > 6) {
					this.checkAll = true;
				} else {
					this.checkAll = false;
				}
			},
			
			// 返回到登录页面
			goBack: function() {
				uni.navigateBack({
					delta: 1,
				})
			},
			
		}
	}
</script>

<style lang="scss">
// @import "../../commons/css/common.scss";

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
	.inputs {
		padding-top: 8rpx;
		input {
			height: 88rpx;
			font-size: $uni-font-size-lg;
			font-weight: 700;
			color: $uni-text-color;
			line-height: 88rpx;
			border-bottom: 1px solid $uni-border-color;
		}
		
		.inputs-div {
			position: relative;
			
			.employ,.invalid {
				position: absolute;
				right: 0;
				top: 0;
				font-size: $uni-font-size-sm;
				font-weight: 500;
				color: $uni-color-warning;
				line-height: 88rpx;
			}
			.ok {
				position: absolute;
				right: 0;
				top: 26rpx;
				width: 52rpx;
				height: 52rpx;
			}
			.look {
				position: absolute;
				right: 0;
				top: 26rpx;
				width: 34rpx;
				height: 34rpx;
			}
		}
	}
}

.active {
	margin: 0 auto;
	width: 520rpx;
	height: 96rpx;
	background: $uni-color-primary;
	box-shadow: 0px 50rpx 32rpx -36rpx rgba(255, 228, 49, 0.4);
	border-radius: 48rpx;
	font-size: $uni-font-size-lg;
	font-weight: 700;
	color: $uni-text-color;
	line-height: 96rpx;
	text-align: center;
}
.inertia {
	margin: 0 auto;
	width: 520rpx;
	height: 96rpx;
	background: rgba(39, 40, 50, 0.2);
	border-radius: 48rpx;
	font-size: $uni-font-size-lg;
	font-weight: 700;
	color: $uni-text-color-inverse;
	line-height: 96rpx;
	text-align: center;
}
</style>
