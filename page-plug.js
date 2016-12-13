	/*
	*   这里是利用原生js编写的分页插件
	*	因为此插件需要的参数较多，所以采用配置参数的方法传参
	*	其中此插件需要的参数格式为
	*	obj = {
	* 		branches: number,  // 含义：每页要展示的信息的条数
	*		pageNav: DOMObject, // 含义：分页下导航的容器，里面的按钮是插件自动生成的，可以为其添加样式
	*		ctsList: DOMObjects, // 含义：需要分页的总的内容的条数  注意：这里是数据确定的条件下需要的参数
	*		prev: DOMobject, // 含义：上一页按钮
	*		next: DOMobject // 含义：下一页按钮
 	* }
	*/

	function pageControl (obj) { 

	 	// 从参数中取到需要的对象并存入变量
		var branches = obj.branches,
		ctsList = obj.ctsList,
		pageNav = obj.pageNav,
		prev = obj.prev,
		next = obj.next;
		
		var ctsListChilds = ctsList.children;       	      // li元素集，保存到变量中，防止反复访问，提升性能
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

		showContains(1);
	}