<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="goBack">
				<image class="back-img" src="../../static/image/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="title">好友请求</view>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
			</view>
		</view>
		<view class="main">
			<view class="requester" v-for="(item, index) in requesters" :key="item.id">
				<view class=" request-top">
					<view class="reject btn">拒绝</view>
					<view class="header-img">
						<image :src="item.imgUrl"></image>
					</view>
					<view class="aggree btn">同意</view>
				</view>
				<view class="request-center">
					<view class="title">这里是名字</view>
					<view class="time">2020-05-01</view></view>
				<view class="notic">
					<text>留言:</text>
					你好，想请求加为好友。谢谢你的通过。和好的。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import myfun from '../../commons/js/myfun.js'
	
	export default {
		data() {
			return {
				requesters: [],
			};
		},
		onLoad() {
			this.getRequesters();
		},
		
		// 返回到登录页面
		methods: {
			// 获取时间
			changeTime: function(date) {
				return myfun.dateTime(date);
			},
			// 获取好友
			getRequesters: function() {
				this.requesters = datas.friends();
				for (let i = 0; i < this.requesters.length; i++) {
					this.requesters[i].imgUrl = '../../static/image/index/' + this.requesters[i].imgUrl;
				}
				console.log(this.requesters);
			},
			
			// 返回到登录页面
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
	
	.top-bar {
		background: rgba(255, 255, 255, 0.96);
		border-bottom: 1px solid $uni-border-color;
		
		.top-bar-left {
			width: 88rpx;
			height: 88rpx;
			.back-img {
				margin-top: 21rpx;
				width: 52rpx;
				height: 52rpx;
			}
		}
		
		.top-bar-center {
			font-size: 40rpx;
		}
	}
	
	.main{
		padding: $uni-spacing-row-base $uni-spacing-col-base;
		.requester{
			margin: 112rpx 0 20rpx;
			padding: $uni-spacing-col-base;
			background : rgba(255,255,255,1);
			box-shadow: 0px 24rpx 64rpx -8rpx rgba(0,0,0,0.1);
			border-radius: $uni-border-radius-base;
		}
		
		.request-top{
			display: flex;
			flex-direction: row;
			.btn {
				flex: none;
				text-align: center;
				width: 160rpx;
				height:64rpx;
				background : rgba( 255,93,91,0.1);
				border-radius: 40rpx;
				font-size: $uni-font-size-lg;
				line-height: 64rpx;
			}
			.reject{
				color: $uni-color-warning;
				background-color: rgba(255,93,91,0.1);
			}
			.aggree{
				color: $uni-text-color;
				background-color: $uni-color-primary;
			}

			.header-img {
				margin-top: -104rpx;
				flex: auto;
				text-align: center;
				image {
					width:144rpx;
					height: 144rpx;
					border-radius: 50%;
					background-color: $uni-color-primary;
				}
			}
		}
		
		.request-center{
			text-align: center;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			.title{
				font-size: 40rpx;
				font-weight:500;
				color:$uni-text-color;
				line-height:50rpx;
			}
			.time{
				font-size:$uni-font-size-sm;
				color:$uni-text-color-disable;
				line-height: 34rpx;
			}
		}
		
		.notic{
			padding: $uni-spacing-row-sm $uni-spacing-col-base;
			border-radius: $uni-border-radius-base;
			background-color: $uni-bg-color-grey;
			font-size:$uni-font-size-base;
			color: $uni-text-color;
			line-height: 40rpx;
		}
	}


</style>
