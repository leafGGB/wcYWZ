<template>
<<<<<<< HEAD
	<view class="container" :style="{height: height + 'rpx'}">
		<view class="emoji" v-for="(line,index) in emoji" :key="index">
			<view class="emoji-item" v-for="(item,index) in line" :key="index" @tap="clickEmoji(item)">
				{{item}}
			</view>
		</view>
=======
	<view class="container">
		<view class="emoji" v-for="(item,index) in emoji" :key="index">
			<view class="emoji-item" v-for="(i,index) in item" :key="index" @tap="clickEmoji(i)">
				{{i}}
			</view>
		</view>
		
>>>>>>> 9961311b848974d6425cfde7c3d55efd0f55624f
	</view>
</template>

<script>
	export default {
<<<<<<< HEAD
		props: {
			height: {
				type: Number,
				default: 460
			},
		},
		data() {
			return {
				emoji:[
					['😀','😁','😂','🤣','😴','😄','😅','😆'],
					['😉','😊','😋','😎','😍','😘','😗','😙'],
					['😌','🙂','🤗','🤔','😐','😑','😶','🙄'],
					['😏','😣','😥','😮','🤐','😯','😪','😫'],
					['😌','😛','😜','😝','🤤','😒','😓','😔'],
					['😕','🙃','🤑','😲','🙁','😖','😤','😢'],
					['😭','😦','😨','😩','🤯','😬','😰','😱'],
					['😳','🤪','😵','😡','😠','🤬','😷','🤒'],
					['🤕','🤕','🤧','😇','🤡','🤥','🤫','🤭'],
					['🧐','💩','😈','💀','👻','🙈','🙉','🙊'],					
					['👶','🧒','👧','👧','🧑','👨','👩','🧓'],
					['👴','👵','👨‍','👩‍','💏','💑','👪','👅'],
					['👄','💋','💘','❤️','️💓','💔','💕','💖'],
					['💗','💙','💚','💛','🧡','💜','🖤','💝'],
					['💞','❣','💌','💬','➡️','⬆️','⬇️','⬅️'],
				]
			};
		},
		methods: {
			clickEmoji:function(item){
				this.$emit('emotion', item);
=======
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
>>>>>>> 9961311b848974d6425cfde7c3d55efd0f55624f
			}
		}
	}
</script>

<style lang="scss">
	.container{
		position:relative;
		overflow-y: auto;
<<<<<<< HEAD
		// height:460rpx;
		// padding-top: 16rpx;
		padding: 30rpx 10rpx 100rpx 10rpx;
		box-sizing: border-box;
=======
		height:460rpx;
>>>>>>> 9961311b848974d6425cfde7c3d55efd0f55624f
		.emoji{
			display: flex;
			box-sizing: border-box;
			overflow: hidden;
			.emoji-item{
				width: 100%;
				height:100rpx;
<<<<<<< HEAD
				// padding:10rpx;
				flex:1;
				text-align: center;
				font-size: 40rpx;
			}
		}
	}
=======
				padding:10rpx;
				flex:1;
				text-align: center;
			}
		}
		
	}

>>>>>>> 9961311b848974d6425cfde7c3d55efd0f55624f
</style>
