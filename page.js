window.onload = function () {

	// 分页函数插件
	function pageControl (branches) {  			//参数是每页显示的条数
		var contains = document.getElementById('containet');
		var ctsList = document.getElementById('pageMain');
		var pageNav = document.getElementById('pageNav');     // 分页的下标
		var prev = document.getElementById('prev'); 		  // 上一页
		var next = document.getElementById('next'); 		  // 下一页
		var ctsListChilds = ctsList.children;       	      // li元素集，保存到变量中，防止反复访问
		var pagers = pageNav.children;   					  // 每一个页号，保存到变量中，防止反复访问

		var len = Math.ceil(ctsListChilds.length / branches); // 页面总数
		var pageNumber = 1;                         		  // 当前所在的页数		

		// 将页数按钮标签写入页面
		var pageButton = ' ';
		for (var j = 1; j <= len; j++) {
			pageButton += '<a href="javascript:void(0)">'+ j +'</a>'
		} 
		pageNav.innerHTML = pageButton;

		// 点击上下页翻页
		next.onclick = function () {
			if (pageNumber >= len) {
				alert("已经是最后一页了!");
				return false;
			}
			showContains(++pageNumber);
		}
		prev.onclick = function () {
			if (pageNumber <= 1) {
				alert("已经是第一页了!");
				return false;
			}
			showContains(--pageNumber);
		}

		// 点击页码数翻页 
		for (var i = 0; i < len; i++) {   // 次处的len和pageNav下a标签的数量相等
			pagers[i].index = i + 1;
			pagers[i].onclick = function () {
				showContains(this.index);
			}
		} 

		// 此函数的作用是将要显示的信息放入页面中
		function showContains (pageNum) {
			var pageNum = arguments[0] ? arguments[0] : 1;   // 若调用时未传入页数，默认为1
			for(var t = 0; t < len; t++) {                   // 将每个下表的样式取消再为激活状态的下表添加样式
				pagers[t].className = '';
			}
			pagers[pageNum - 1].className = 'active';       
			for(var n = ctsListChilds.length; n > 0; n--) {  // 先将每一项都默认置为不可见
				ctsListChilds[n - 1].style.display = "none";
			}
			for (var i = 0; i < branches; i++) {             // 循环的次数是每页显示的条数
				var indexer = ctsListChilds[(pageNum - 1) * branches + i];  // 要显示的其中一条
				if (indexer == undefined) { break; } 
				indexer.style.display = "block";
			}
		}

		showContains();
	}

	pageControl(7);  // 调用并传入参数
}