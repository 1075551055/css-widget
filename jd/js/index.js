// 这种使用方法叫做沙箱，就是相当于一个虚拟环境，可以防止变量的污染，
// 因为定义的变量方法等都只在这个作用域范围内有效，而且还可以访问全局
// 变量函数等。在JavaScript中方法指的是对象点出来的，是对象拥有的，而
// 函数就像无主的魂，没有属于具体的对象(这种说法不是特别严谨，其实函数
// 是属于window对象的)
(function(){
	addLoadEvent(moveSlider);
	addLoadEvent(addClickEventListener);

	var lunboUl = my$("lunboUl");
	var lunboLiList = lunboUl.getElementsByTagName("li");
	var lunboLiCount = lunboLiList.length;
	var lunboLiWidth = lunboLiList[0].offsetWidth;

	function moveSlider(){
		var i = 0;
		var timeId = setInterval(function(){
			i++;
			lunboUl.style.left = -(i * lunboLiWidth) + "px";
			if(i >= lunboLiCount - 1){
			// window.clearInterval(timeId);
			i = 0;
		}
	},1000)
	}

	function addClickEventListener(){
		my$("lunboLeft").onclick = function(){
		// console.log(my$("lunboUl").offsetLeft);
		var lunboUlLeft = lunboUl.offsetLeft;
		lunboUl.style.left = lunboUlLeft + lunboLiWidth + "px";
	}
}
})();


