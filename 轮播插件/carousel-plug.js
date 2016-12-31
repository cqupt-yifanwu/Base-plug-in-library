function carousel (obj) {
	var photos = obj.photos, // 所有的图片
	contImg = obj.contImg,   // 显示大图的容器
	speed = obj.speed,  // 轮播图切换图片的速度
	leftBtn = obj.leftBtn, // 向左切换的按钮
	rightBtn = obj.rightBtn, // 向右切换的按钮
	index = 1;  // 记录当前的图片


	// 切换图片的函数
	function changePic (indexer) {
		contImg.src = "images/photo/tu0"+ indexer +".jpg";
	}

	// 自动播放的函数
	var timer = setInterval(function play () {

		// 防止超过
		if (++index > photos.length) {
			index = 1;
		}
		changePic(index)
	}, speed)

	// 按钮点击
	leftBtn.onClick = function () {
		if (--index < 1) {
			index = index + photos.length;
		}
		changePic(index);
	}
	rightBtn.onClick = function () {
		if (++index > photos.length) {
			index = 1;
		}
		changePic(index);
	}
}