export default{
	// 首页时间转化
	dateTime(date) {
		let oldTime = new Date(date);
		let nowTime = new Date();
		// 获取 oldTime 具体时间
		let d = oldTime.getTime();
		let h = oldTime.getHours();
		let m = oldTime.getMinutes();
		let Y = oldTime.getFullYear();
		let M = oldTime.getMonth()+1;
		let D = oldTime.getDate();
		// 获取 nowTime 具体时间
		let nd = nowTime.getTime();
		let nh = nowTime.getHours();
		let nm = nowTime.getMinutes();
		let nY = nowTime.getFullYear();
		let nM = nowTime.getMonth()+1;
		let nD = nowTime.getDate();
		
		// 当天时间
		if (D === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return h + ':' + m;
		}
		
		// 昨天时间
		if (D+1 === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return '昨天' + h + ':' + m;
		} else {
			// 大于两天
			return Y + '/' + M + '/' + D;
		}
	},
	
	// 聊天时间
	chatTime(date) {
		let oldTime = new Date(date);
		let nowTime = new Date();
		// 获取 oldTime 具体时间
		let d = oldTime.getTime();
		let h = oldTime.getHours();
		let m = oldTime.getMinutes();
		let Y = oldTime.getFullYear();
		let M = oldTime.getMonth()+1;
		let D = oldTime.getDate();
		// 获取 nowTime 具体时间
		let nd = nowTime.getTime();
		let nh = nowTime.getHours();
		let nm = nowTime.getMinutes();
		let nY = nowTime.getFullYear();
		let nM = nowTime.getMonth()+1;
		let nD = nowTime.getDate();
		
		// 当天时间
		if (D === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return h + ':' + m;
		}
		
		// 昨天时间
		if (D+1 === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return '昨天' + h + ':' + m;
		} else if(Y === nY) {
			// 今年
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return M + '月' + D + '日' + h + ':' + m;
		} else {
			// 今年以前
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return Y + '年' + M + '月' + D + '日' + h + ':' + m;
		}
	},
	
	
	// 详细时间转化
	detialTime(date) {
		let oldTime = new Date(date);
		// 获取 oldTime 具体时间
		let d = oldTime.getTime();
		let h = oldTime.getHours();
		let m = oldTime.getMinutes();
		let Y = oldTime.getFullYear();
		let M = oldTime.getMonth()+1;
		let D = oldTime.getDate();
		
		// 处理时间
		if (M < 10) {
			M = '0'+ M;
		}
		if (M < 10) {
			D = '0'+ D;
		}
		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		return Y + '-' + M + '-' + D + '' + h +':' + m;
	},
	
	// 时间间隔
	spaceTime(oldTime, nowTime) {
		oldTime = new Date(oldTime);
		nowTime = new Date(nowTime);
		let tOldTime = oldTime.getTime();
		let tNowTime = nowTime.getTime();
		if (tOldTime > (tNowTime + 1000*60*3)) {
			return oldTime;
		} else {
			return '';
		}
	},
	
	// 搜索延时函数
	debounce(fn, t) {
		let delay = t || 500;
		let timer;
		return function() {
			let args = arguments;
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				timer = null;
				fn.apply(this, args);
			}, delay);
		}
	},
	
}