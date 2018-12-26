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