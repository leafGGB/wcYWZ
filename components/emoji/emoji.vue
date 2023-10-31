<template>
	<view class="container">
		<view class="emoji" v-for="(item,index) in emoji" :key="index">
			<view class="emoji-item" v-for="(i,index) in item" :key="index" @tap="clickEmoji(i)">
				{{i}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emoji:[
					['😀','😁','😂','🤣','😃','😄','😅','😆'],
					['😉','😊','😋','😎','😍','😘','😗','😙'],
					['☺️','🙂','🤗','🤔','😐','😑','😶','🙄'],
					['😏','😣','😥','😮','🤐','😯','😪','😫'],
					['😏','😣','😥','😮','🤐','😯','😪','😫'],
					['😏','😣','😥','😮','🤐','😯','😪','😫'],
					
				]
			}
		},
		methods: {
			clickEmoji:function(i){
				this.$emit('emotion',i)
			}
		}
	}
</script>

<style lang="scss">
	.container{
		position:relative;
		overflow-y: auto;
		height:460rpx;
		.emoji{
			display: flex;
			box-sizing: border-box;
			overflow: hidden;
			.emoji-item{
				width: 100%;
				height:100rpx;
				padding:10rpx;
				flex:1;
				text-align: center;
			}
		}
		
	}

</style>
