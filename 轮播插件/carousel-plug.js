/*
	*   这里是利用原生js编写的分页插件
	*	因为此插件需要的参数较多，所以采用配置参数的方法传参
	*	其中此插件需要的参数格式为
	*	var photoCtn = obj.photoCtn, // 小图的容器
	*	contImg = obj.contImg,  	 // 显示大图的容器
	*	speed = obj.speed, 		 	 // 轮播图切换图片的速度
	*	leftBtn = obj.leftBtn,   	 // 向左切换的按钮
	* 	rightBtn = obj.rightBtn, 	 // 向右切换的按钮
 	* }
*/
function carousel (obj) {
	var photoCtn = obj.photoCtn, // 小图的容器
	contImg = obj.contImg,   // 显示大图的容器
	speed = obj.speed,  // 轮播图切换图片的速度
	leftBtn = obj.leftBtn, // 向左切换的按钮
	rightBtn = obj.rightBtn, // 向右切换的按钮
	photos = photoCtn.children, // 图片的集合(一组li元素)
	index = 1;  // 记录当前的图片

	// 切换图片的函数
	function changePic (indexer) {
		contImg.src = "images/photo/tu0"+ indexer +".jpg";
	}

	// 自动播放
	function play () {

		// 防止超过
		if (++index > photos.length) {
			index = 1;
		}
		console.log(index);
		changePic(index)
	}

	var timer = setInterval(play, speed);

	// 按钮点击
	leftBtn.onclick = function () {
		clearInterval(timer);
		if (--index < 1) {
			index = index + photos.length;
		}
		changePic(index);
		timer = setInterval(play, speed);
	};
	rightBtn.onclick = function () {
		clearInterval(timer);
		if (++index > photos.length) {
			index = 1;
		}
		changePic(index);
		timer = setInterval(play, speed);
	};

	// 点击小图片切换到大图，给每一个小图添加事件
	photoCtn.onclick = function (e) {
		clearInterval(timer);

		// 因为原生js没有index()属性，所以用下面的方法取得每个元素的index
		for (var i = 0; i < photos.length; i++) {
			photos[i].indexing = i + 1;
		}
		index = e.target.parentNode.indexing;
		changePic(index);	
		timer = setInterval(play, speed);
	}
}