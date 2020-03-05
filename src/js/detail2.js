	/*
	需求分析:
	1 鼠标移入small中,mask显示,big也显示
	2 鼠标移出small,mask隐藏,big隐藏
	3 mask可以移动,不能超出small,鼠标在mask中间
	4 当mask在small中移动,大图显示相应位置
	*/
	var small = document.querySelector('.small'); //小图片所在的盒子
	var mask = document.querySelector('.mask'); //遮罩层
	var big = document.querySelector('.big'); //大图片所在的盒子
	var detailLeft = document.querySelector('.detail-Left'); //总的大盒子
	var bigImg = document.querySelector('.bigImg');
	// 鼠标移入small中,mask显示,big也显示
	small.onmouseenter = function(){
		mask.style.display = 'block';
		big.style.display = 'block';
	}
	// 鼠标移出small,mask隐藏,big隐藏
	small.onmouseleave = function(){
		mask.style.display = 'none';
		big.style.display = 'none';
	}

	// mask可以移动,不能超出small,鼠标在mask中间
	mask.onmousemove = function(e){
		//为了便于mask跟随鼠标定位,需要计算鼠标在small中的坐标
		var e = e || window.event;
	
		var x = e.clientX +getScroll().left -detailLeft.offsetLeft-mask.offsetWidth/2;
		var y = e.clientY +getScroll().top -detailLeft.offsetTop-mask.offsetHeight/2;

		// 边界判断
		if(x<0){
			x=0
		}
		if(x>small.offsetWidth-mask.offsetWidth){
			x = small.offsetWidth-mask.offsetWidth;
		}
		if(y<0){
			y=0;
		}
		if(y>small.offsetHeight-mask.offsetHeight){
			y=small.offsetHeight-mask.offsetHeight
		}
		// 定位蒙版层mask
		mask.style.left = x + 'px';
		mask.style.top = y + 'px';
		// 当mask在small中移动,大图显示相应位置
		// x/small.offsetWidth = 大图要偏移的距离/大图的宽度
		var left = x/small.offsetWidth*bigImg.offsetWidth;
		// y/small.offsetHeight = 大图要偏移的距离/大图的高度
		var top = y/small.offsetHeight*bigImg.offsetHeight;
		// 设置图片的位置
		bigImg.style.left = -left + "px";
		bigImg.style.top = -top + "px";

}