<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="goBack">
				<image class="back-img" src="../../static/image/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="title">GGB</view>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
				<view class="group-img">
					<image src="../../static/image/index/cat.png" mode=""></image>
				</view>
			</view>
		</view>
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom: inputh + 'px'}">
				<view class="chat-ls" v-for="(item, index) in msgs" :key="index" :id="'msg'+item.tip">
					<view class="chat-time" v-show="item.time != ''">{{changeTime(item.time)}}</view>
					<view class="msg-m msg-left" v-if="item.id != 'b'">
						<image class="user-img" :src="item.imgUrl"></image>
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.types == 1" @tap="previewImg(item.message)">
							<image :src="item.message" class="msg-img" mode="widthFix"></image>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.id == 'b'">
						<image class="user-img" :src="item.imgUrl"></image>
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.types == 1" @tap="previewImg(item.message)">
							<image :src="item.message" class="msg-img" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="padbt"></view>
			</view>
			<submit @inputs="inputs" @height="heightFn"></submit>
		</scroll-view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import myfun from '../../commons/js/myfun.js'
	import submit from '../../components/submit/submit.vue'
	
	export default {
		data() {
			return {
				msgs: [],
				imgMsg: [],
				scrollToView: '',
				inputh: '60',
				// oldTime: new Date(),
			};
		},
		onLoad: function() {
			this.getMsg()
		},
		components: {
			submit,
		},
		methods: {
			// 返回到登录页面
			goBack: function() {
				uni.navigateBack({
					delta: 1,
				})
			},
			
			// 时间处理
			changeTime: function(date) {
				return myfun.chatTime(date);
			},
			
			// 获取聊天数据
			getMsg: function() {
				let aa = new Date(this.oldTime)
				let msg = datas.message();
				for (var i = 0; i < msg.length; i++) {
					msg[i].imgUrl = '../../static/image/index/' + msg[i].imgUrl;
					
					// 时间间隔
					if (i < msg.length - 1) {
						let t = myfun.spaceTime(msg[i].time, msg[i+1].time);
						msg[i].time = t;
					}
					
					// 补充图片地址
					if (msg[i].types == 1) {
						msg[i].message = '../../static/image/index/' + msg[i].message;
						this.imgMsg.unshift(msg[i].message);
					}
					this.msgs.unshift(msg[i]);
				}
				// console.log(this.msgs);
				this.$nextTick(function() {
					this.scrollToView = 'msg' + this.msgs[i-1].tip;
				})
			},
			
			// 预览图片
			previewImg: function(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			
			// 接收输入内容
			inputs: function(e) {
				let len = this.msgs.length;
				let data = {
					id: 'b',                 // 用户id
					imgUrl: '../../static/image/index/dog.png',
					message: e,
					types: 0,                // 内容类型（0：文字，1：图片链接，2：音频链接...)
					time: new Date(),   // 发送时间
					tip: len,
			};
				this.msgs.push(data);
				this.$nextTick(function() {
					this.scrollToView = 'msg' + len;
					console.log(this.scrollToView)
				})
			},
			// 输入框高度
			heightFn: function(e) {
				this.inputh = Math.round(e);
				this.locationLastMsg();
			},
			// 滚动到底部
			locationLastMsg: function() {
				this.scrollToView = '';
				this.$nextTick(function() {
					let len = this.msgs.length - 1;
					this.scrollToView = 'msg' + this.msgs[len].tip;
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/common.scss";
	
	page {
		height: 100%;
	}
	.content {
		height: 100%;
		background: rgba(244, 244, 244, 1);
	}
	
	.top-bar {
		background: rgba(244, 244, 244, 0.96);
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
		
		.top-bar-right {
			.group-img {
				padding-left: 32rpx;
				image {
					border-radius: 12rpx;
					width: 52rpx;
					height: 52rpx;
				}
			}
		}
	}
	
	.chat{
		height: 100%;
		.padbt {
			height: var(--status-bar-height);
			width: 100%;
		}
		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			padding-bottom: 120rpx;
			display: flex;
			flex-direction: column;
		}
		
		.chat-ls{
			.chat-time {
				font-size: $uni-font-size-sm;
				color: rgba(39,40,50,0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}
			.msg-m {
				display: flex;
				padding: 20rpx 0;
				.user-img {
					flex: none;
					width: $uni-img-size-sm;
					height:$uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}
				.message{
					flex: none;
					max-width: 480rpx;
				}
				.msg-text{
					font-size: 35rpx;
					color: $uni-text-color;
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}
				.msg-img {
					max-width: 400rpx;
					border-radius: $uni-border-radius-base;
				}
			}
			.msg-left{
				flex-direction: row;
				.msg-text{
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}
				.msg-img {
					margin-left: 16rpx;
				}
			}
			.msg-right{
				flex-direction: row-reverse;
				.msg-text{
					margin-right: 16rpx;
					background-color: #c2e9fb;
					border-radius :20rpx 0rpx 20rpx 20rpx;
				}
				.msg-img {
					margin-right: 16rpx;
				}
			}
		}

	}

</style>
