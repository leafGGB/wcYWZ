<template>
	<view class="content">
		<view class="top-bar">
			<view class="header">
				<input class="search" type="search" @input="search" placeholder="搜索用户/群" placeholder-style="color:#aaa;font-weight:400;">
				<image class="search-img" src="../../static/image/index/search.png"></image>
			</view>
			<view class="top-bar-right">
				<view class="text" @tap="goBack">取消</view>
			</view>
		</view>
		
		<view class="main">
			<view class="users result">
				<view class="title" v-show="userArr.length > 0">用户</view>
				<view class="list user" v-for="(item, index) in userArr" :key="item.id">
					<navigator url="../userHome/userHome?id=aaa" hover-class="none">
						<image :src="item.imgUrl"></image>
					</navigator>
					<view class="list-r">
						<view class="names">
							<view class="name" v-html="item.name"></view>
							<view class="email" v-html="item.email"></view>
						</view>
						<view class="right-btn send" v-show="item.tip == 1">发消息</view>
						<view class="right-btn addFriend" v-show="item.tip == 0">加好友</view>
					</view>
				</view>
				<!-- <view class="list user">
					<image src="../../static/image/index/cat.png"></image>
					<view class="list-r">
						<view class="names">
							<view class="name">GGB</view>
							<view class="email">woshiGGBsss@126.com</view>
						</view>
						<view class="right-btn addFriend">加好友</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	export default {
		data() {
			return {
				userArr: []
			};
		},
		methods: {
			// 获取关键字
			search: function(e) {
				this.userArr = [];
				let searchVal = e.detail.value;
				if (searchVal.length > 0) {
					this.searchUser(searchVal);
				}
			},
			
			// 获取关键字匹配的好友
			searchUser: function(e) {
				let exp = eval("/"+e+"/g");
				let arr = datas.friends();
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
						this.isFriend(arr[i]);
						arr[i].imgUrl = '../../static/image/index/' + arr[i].imgUrl;
						arr[i].name = arr[i].name.replace(exp,"<span style='color: #8fd3f4;'>"+e+"</span>");
						arr[i].email = arr[i].email.replace(exp,"<span style='color: #8fd3f4;'>"+e+"</span>");
						this.userArr.push(arr[i]);
					}
				}
				// console.log(this.userArr);
			},
			
			// 判断是否为好友
			isFriend: function(e) {
				let tip = 0;
				let arr = datas.isFriend();
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].friend == e.id) {
						tip = 1;
					}
				}
				e.tip = tip;
			},
			
			// 返回到首页
			goBack: function() {
				uni.navigateBack({
					delta: 1,
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/common.scss";
	
	.content {
		.top-bar {
			background: rgba(255, 255, 255, 0.96);
			border-bottom: 1px solid $uni-border-color;
			.header {
				width: 100%;
				z-index: -1;
				box-sizing: border-box;
				padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
				
				.search {
					width: 100%;
					padding: 0 60rpx 0 12rpx;
					height: 60rpx;
					background: $uni-bg-color-grey;
					border-radius: 10rpx;
				}
				
				.search-img {
					position: absolute;
					right: 160rpx;
					top: 22rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		
		.text {
			width: 66rpx;
			font-size: $uni-font-size-lg;
			font-weight: 700;
			color: $uni-text-color;
			line-height: 88rpx;
		}
		
		.main {
			padding: 88rpx $uni-spacing-col-base;
			
			.result {
				padding-top: $uni-spacing-col-base;
				.title {
					font-size: 44rpx;
					font-weight: 600;
					color: $uni-text-color;
					line-height: 60rpx;
				}
				.list {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 100%;
					height: 80rpx;
					padding: 20rpx 0;
					
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: $uni-border-radius-base;
					}					
				}
				.list-r {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width:100%;
				}
				.names {
					padding-left: $uni-spacing-col-base;
					.name {
						font-size: 36rpx;
						color: $uni-text-color;
						line-height: 50rpx;
					}
				}
				.email {
					font-size: $uni-font-size-sm;
					color: $uni-text-color;
					line-height: 20rpx;
				}
				.right-btn {
					width: 120rpx;
					height: 48rpx;
					border-radius: 24rpx;
					font-size: $uni-font-size-sm;
					line-height: 48rpx;
					// margin-top: 16rpx;
					text-align: center;
				}
				.send {
					background-color: $uni-color-primary;
					color: $uni-text-color;
				}
				.addFriend {
					background-color: rgba(74, 170, 255, 0.1);
					color: $uni-color-success;
				}
			}
		}
	}
	
	// .content {
	// 	// display: flex;
	// 	// flex-direction: column;
	// 	// align-items: center;
	// 	// justify-content: center;
	// 	padding-top: var(--status-bar-height);
	// }
	// .top-bar {
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	z-index: 1001;
	// 	height: 88rpx;
	// 	width: 100%;
	// 	padding-top: var(--status-bar-height);
	// 	background: $uni-bg-color;
		
	// 	.top-bar-right {
	// 		float: right;
	// 		padding-right: 32rpx;
			
	// 		.text {
	// 			font-size: $uni-font-size-lg;
	// 			font-weight: 700;
	// 			color: $uni-text-color;
	// 			line-height: 88rpx;
	// 		}
	// 	}
	// }
</style>
