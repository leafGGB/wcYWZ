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
		<scroll-view class="chat" scroll-y="true" :scroll-with-animation="swanition" :scroll-into-view="scrollToView" @scrolltoupper="nextPage()">
			<view class="chat-main" :style="{paddingBottom: inputh + 'px'}" @tap="clickBlank">
				<!-- <image class="loading-img" src="../../static/image/common/loading.gif" mode=""></image> -->
				<view class="space"></view>
				<!-- 加载动画 -->
				<view class="loading" v-show="isLoading">
					<image class="loading-img" :animation="animationData" src="../../static/image/common/loading.gif" mode=""></image>
				</view>
				<view class="chat-ls" v-for="(item, index) in msgs" :key="index" :id="'msg'+item.tip">
					<view class="chat-time" v-show="item.time != ''">{{changeTime(item.time)}}</view>
					<view class="msg-m msg-left" v-if="item.id != 'b'">
						<image class="user-img" :src="item.imgUrl"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.types == 1" @tap="previewImg(item.message)">
							<image :src="item.message" class="msg-img" mode="widthFix"></image>
						</view>
						<!-- 音频 -->
						<view class="message" v-if="item.types == 2">
							<view class="msg-text voice" :style="{width: item.message.time*8+'rpx'}" @tap="playVoice(item.message.voice)">
								<image src="../../static/image/chatRoom/sound.png" class="voice-img"></image>
								<view class="time">
									{{item.message.time}}"
								</view>
							</view>
						</view>
						
						<!-- 定位 -->
						<view class="message" v-if="item.types == 3">
							<view class="msg-map" @tap="openLocaton(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<image class="map-img" src="../../static/image/chatRoom/map.jpg" mode="aspectFit"></image>
								<!-- <map class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="covers(item.message)"></map> -->
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.id == 'b'">
						<image class="user-img" :src="item.imgUrl"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.types == 1" @tap="previewImg(item.message)">
							<image :src="item.message" class="msg-img" mode="widthFix"></image>
						</view>
						<!-- 音频 -->
						<view class="message" v-if="item.types == 2">
							<view class="msg-text voice" :style="{width: item.message.time*8+'rpx'}" @tap="playVoice(item.message.voice)">
								<view class="time">
									{{item.message.time}}"
								</view>
								<image src="../../static/image/chatRoom/sound.png" class="voice-img"></image>
							</view>
						</view>
						
						<!-- 定位 -->
						<view class="message" v-if="item.types == 3">
							<view class="msg-map" @tap="openLocaton(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<image class="map-img" src="../../static/image/chatRoom/map.jpg" mode="aspectFit"></image>
								<!-- <map class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="covers(item.message)"></map> -->
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="padbt"></view> -->
			</view>
		</scroll-view>
		<submit @inputs="inputs" @height="heightFn" ref="submit"></submit>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import myfun from '../../commons/js/myfun.js'
	import submit from '../../components/submit/submit.vue'
	
	// 音频
	const innerAudioContext = uni.createInnerAudioContext();
	
	export default {
		data() {
			return {
				msgs: [],
				imgMsg: [],
				scrollToView: '',
				inputh: '60',
				oldTime: new Date(),
				animationData: {},       // 加载动画
				pageNumber: 0,           // 页码
				loading: '',
				isLoading: false,        // 是否在加载中
				swanition: true,
				beginloading: true,      // 禁止重复加载
			};
		},
		onLoad: function() {
			this.getMsg(this.pageNumber);
			// this.nextPage();
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
			getMsg: function(page) {
				let msg = datas.message();
				let maxpages = msg.length;
				if (msg.length > (page+1)*10) {
					maxpages = (page+1)*10;
					// 页码加1
					this.pageNumber++;
				} else {
					// 数据全部取完
					this.pageNumber = -1;
				}
				
				for (var i = page*10; i < maxpages; i++) {
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
					this.swanition = false;
					this.scrollToView = 'msg' + this.msgs[maxpages-page*10-1].tip;
				})
				
				// 关闭loading
				clearInterval(this.loading);
				this.isLoading = false;
				// 开启加载
				this.beginloading = true;
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
				this.swanition = true;
				let len = this.msgs.length;
				
				// 时间间隔
				let nowTime = new Date();
				let t = myfun.spaceTime(this.oldTime, nowTime);
				if (t) {
					this.oldTime = t;
				}
				nowTime = t;
				
				let data = {
					id: 'b',                 // 用户id
					imgUrl: '../../static/image/index/dog.png',
					message: e.message,
					types: e.types,                // 内容类型（0：文字，1：图片链接，2：音频链接...)
					time: nowTime,        // 发送时间
					tip: len,
				};
				this.msgs.push(data);
				this.$nextTick(function() {
					setTimeout(() => {
					    this.scrollToView = 'msg' + len;
					}, 0);
					// this.scrollToView = 'msg' + len;
				})
				if (e.types == 1) {
					this.imgMsg.push(e.message);
				}
			},
			// 输入框高度
			heightFn: function(e) {
				this.inputh = Math.round(e);
				this.locationLastMsg();
			},
			// 滚动到底部
			locationLastMsg: function() {
				this.swanition = true;
				this.scrollToView = '';
				this.$nextTick(function() {
					let len = this.msgs.length - 1;
					this.scrollToView = 'msg' + this.msgs[len].tip;
				})
			},
			
			// 滚动到顶部加载页面
			nextPage: function(){
			// 	var animation = uni.createAnimation({
			// 		duration: 1000,
			// 		timingFunction: 'ease',
			// 	})
			
			// 	this.animation = animation
			
			// 	animation.scale(2,2).rotate(45).step()
			
			// 	// this.animationData = animation.export()
			
			// 	let aaa = setInterval(function() {
			// 	  animation.translate(30).step()
			// 	  this.animationData = animation.export()
			// 	}.bind(this), 1000)
			
				if (this.pageNumber > 0 && this.beginloading) {
					this.isLoading = true;
					// 禁止重复加载
					this.beginloading = false;
					
					this.loading = setTimeout(() => {
						this.getMsg(this.pageNumber);
					}, 2000);
				}
			},
			
			// 点击空白区域,收起区域
			clickBlank: function(){
				if(this.$refs.submit.isEmoji === true){
					this.$refs.submit.emoji()
				}
				if(this.$refs.submit.isMoreModule === true){
					this.$refs.submit.moreFun()
				}
			},
			
			// 音频播放
			playVoice: function(e) {
				innerAudioContext.src = e;
				innerAudioContext.play();
			},
			
			// 地图展示
			covers: function(e) {
				let map = [{
					latitude: e.latitude,
					longitude: e.longitude,
					iconPath: '../../static/image/chatRoom/location-map.png'
				}]
				return (map);
			},
			
			// 导航
			openLocaton: function(e) {
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: function () {
						console.log('success');
					}
				});
			},
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
	
	.space {
		width: 100%;
		height: 100rpx;
	}
	.chat{
		height: 100%;
		.padbt {
			height: env(safe-area-inset-bottom);
			width: 100%;
		}
		
		.loading {
			text-align: center;
			.loading-img {
				width: 133rpx;
				height: 75rpx;
			}
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
				.msg-map {
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;
					.map-name {
						font-size: $uni-font-size-lg;
						color: $uni-text-color;
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.map-address {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-disable;
						padding: 0rpx 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.map-img {
						padding-top: 8rpx;
						width: 480rpx;
						height: 190rpx;
					}
				}

				.voice {
					width: 200rpx;
				}
				.voice-img {
					width: 52rpx;
					height: 52rpx;
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
				.msg-map{
					margin-left: 16rpx;
					border-radius :0px 20rpx 20rpx 20rpx;
				}
				.voice {
					min-width: 140rpx;
					max-width: 400rpx;
					display: flex;
					justify-content: start;
					align-items: center;
					.time {
						font-size: 32rpx;
						padding-left: 8rpx;
					}
					.voice-img {
						width: 54rpx;
						height: 54rpx;
					}
				}
			}
			.msg-right{
				flex-direction: row-reverse;
				.msg-text{
					margin-right: 16rpx;
					background-color: #c2e9fb;
					border-radius :20rpx 0px 20rpx 20rpx;
				}
				.msg-img {
					margin-right: 16rpx;
				}
				.msg-map{
					margin-right: 16rpx;
					border-radius :20px 0rpx 20rpx 20rpx;
				}
				.voice {
					// width: 140rpx;
					min-width: 140rpx;
					max-width: 400rpx;
					display: flex;
					justify-content: flex-end;
					margin-left: auto;
					align-items: center;
					.time {
						font-size: 32rpx;
						padding-right: 8rpx;
					}
					.voice-img {
						width: 54rpx;
						height: 54rpx;
					}
				}
			}
		}

	}

</style>
