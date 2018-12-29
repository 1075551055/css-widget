function addLoadEvent(func){
	var oldOnload = window.onload;
	if(typeof oldOnload !== 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldOnload();
			func();
		}
	}
}

addLoadEvent(searchSliding);
addLoadEvent(rollingBanner);

function searchSliding(){
	// 1.设置search头部透明度为0
	var searchBox = document.querySelector('.search_box'); //推荐使用，返回的是非实时状态伪数组对象(《高性能javascript》一书中有做详细说明)
	searchBox.style.background = 'rgba(201,21,35,0)';
	var banner = document.querySelector('.banner');
	//banner元素高度
	var bannerHeight = banner.offsetHeight;
	// 2.当滑动滚动条的时候获取页面卷曲出去的高度，并相应地设置透明度
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop;
		console.log(scrollTop);
		var opacity = 0;
		if(scrollTop < bannerHeight){
			opacity = scrollTop/bannerHeight * 0.85;
		}else{
			// 3.滑动到一定的高度的时候，透明度不变
			opacity = 0.85;
		}
		searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';

	}
	
}

function rollingBanner(){
	// 1.获取到banner对应的ul元素以及其他元素
	var bannerUl = document.querySelector('.banner ul:first-child');
	var pointUl = document.querySelector('.banner ul:last-child');
	var pointLiList = pointUl.querySelectorAll('li');
	var bannerWidth = document.querySelector('.banner').offsetWidth;

	// 2.定时让ul元素向左每次位移一张图片
	// 注意：默认图片是从第二张开始的，10张图片，有两张是重复的(前后两张)
	var rollingIndex = 1;
	var intervalTransition = function(){
		rollingIndex ++;
		// 设置动画
		setTransitionAndTranslate(rollingIndex);
		
	};
	// 抽取函数 性能优化 不用每次new一个function对象
	var bannerRollingInterval = setInterval(intervalTransition, 1000)

	function setPoint(){
		// 清除样式
		for (var i = 0; i < pointLiList.length; i++) {
			pointLiList[i].classList.remove('current');
		}
		// 设置当前图片对应的点的背景
		pointLiList[rollingIndex-1].classList.add('current');
	}
	
	function setTransitionAndTranslate(rollingIndex){
		// var translateWidth = -10 * rollingIndex + '%';
		var translateWidth = -rollingIndex * bannerWidth;
		// console.log('translateX('+ translateWidth +')');
		// 定时器的时间最好比bannerUl的动画时间大,否则会出现一卡一卡的现象 
		bannerUl.style.webkitTransition = 'all 0.2s ease';
		bannerUl.style.transform = 'translateX('+ translateWidth +'px)';
		bannerUl.style.webkitTransform = 'translateX('+ translateWidth +'px)';
	}

	function removeTransition(){
		bannerUl.style.transition = 'none';
		bannerUl.style.webkitTransition = 'none';
	}

	function setTranslateX(translateWidth){
		// var translateWidth = 
		bannerUl.style.transform = 'translateX('+ translateWidth +'px)';
		bannerUl.style.webkitTransform = 'translateX('+ translateWidth +'px)';
	}

	// 添加动画结束监听事件. webkit内核浏览器特有的api:addEventListener, IE没有
	bannerUl.addEventListener('transitionend',function() {
		// 在谷歌浏览器运行久了之后，rollingIndex居然会出现奇怪的值，比9还要大，为什么？有待考究，
		// 所以加了大于9的判断.最好做个性能分析，貌似后期很卡 => todo:用谷歌浏览器分析一下
		if(rollingIndex >= 9){
			// 3.当最后一张图片移动完之后瞬间切换到第一张(第一张和最后一张是一样的图片,这样做到无缝滚动)
			rollingIndex = 1;
			removeTransition();
			setTranslateX(-rollingIndex * bannerWidth);
		}
		// 动画结束之时，设置点的背景跟随动画的变动而变动。tips:找准事件的触发时机，然后执行相对应的function
		setPoint();
		
	})

	// 移动端四个触摸事件：
	// 1.touchstart ->手指按到屏幕的时候触发 
	// 2.touchmove -> 手指滑动的时候触发 
	// 3.touchend -> 手指离开的时候触发 
	// 4.touchcancel -> 操作被中断的时候触发，例如突然间进来个电话，当前操作被中断了
	var startPosition;
	bannerUl.addEventListener('touchstart',function(e){
		if(bannerRollingInterval != null){
			// 触摸之时清除定时器
			clearInterval(bannerRollingInterval);
			bannerRollingInterval = null;
		}
		// touches获取触摸点，可能有多个，取其中一个做为参考就ok. 获取触摸点在浏览器(client)窗口中的x距离
		startPosition = e.touches[0].clientX;
	})

	bannerUl.addEventListener('touchmove',function(e){
		var moveXPosition = e.touches[0].clientX - startPosition;
		setTranslateX(-rollingIndex * bannerWidth + moveXPosition);
	})

	bannerUl.addEventListener('touchend',function(e){
		
	})

	bannerUl.addEventListener('touchcancel',function(e){

	})
}