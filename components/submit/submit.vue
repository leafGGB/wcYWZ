<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="btn-img" @tap="records">
					<image :src="this.toc" mode=""></image>
				</view>
				<textarea auto-height="true" class="chat-send btn" v-show="!isRecoed" @input="inputs" v-model="msg"></textarea>
				<view class="record btn" v-show="isRecoed">按住说话</view>
				<view class="btn-img" @tap="emoji">
					<image src="../../static/image/submit/face.png" mode=""></image>
				</view>
				<view class="btn-img">
					<image src="../../static/image/submit/addition.png" mode=""></image>
				</view>
			</view>
			<view class="emoji" v-show="isEmoji">
				表情
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
			
			//文字发送
			inputs: function(e) {
				var chatm = e.detail.value;
				var pos = chatm.indexOf('\n');
				if(pos!=-1 && chatm.length > 1){
					this.$emit('inputs', this.msg);
					setTimeout(() => {
						this.msg = '';
					}, 0)
				}
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
		.record{
			text-align: center;
			font-size: $uni-font-size-lg;
			color:$uni-text-color-grey;
		}
	}
	
	.emoji{
		width:100%;
		height:460rpx;
		background : rgba(236,237,238,1);
		box-shadow:0px -1rpx 0px 0px rgba(0,0,0,0.1);
	}

</style>
