	/*
	*   这里是利用原生js编写的分页插件
	*	因为此插件需要的参数较多，所以采用配置参数的方法传参
	*	其中此插件需要的参数格式为
	*	obj = {
	* 		branches: number,  // 含义：每页要展示的信息的条数
	*		pageNav: DOMObject, // 含义：分页下导航的容器，里面的按钮是插件自动生成的，可以为其添加样式
	*		ctsList: DOMObjects, // 含义：需要分页的总的内容的条数  注意：这里是数据确定的条件下需要的参数
	*		prev: DOMobject, // 含义：上一页按钮
	*		next: DOMobject, // 含义：下一页按钮
	*		url: url, // 含义：请求数据的地址（非必需）
			contentUl: DOMobject // 含义：包含信息的容器-ul元素（当数据需要从服务端获取的时候需要此参数）
 	* }
	*/

	function pageControl (obj) { 

	 	// 从参数中取到需要的对象并存入变量
		var branches = obj.branches,
		ctsList = obj.ctsList,
		pageNav = obj.pageNav,
		prev = obj.prev,
		next = obj.next
		url = obj.url;

		// 若数据需要从服务器获取，需要打开下面的注释，然后将第46行-100行放入37行的函数中（ajax的成功回调函数）
		/*if (!ctsList) {
			//*
			//*  注意： 这里服务器发送的数据需要有一定的格式限制
			//*  基本格式为 
			//*	[{
			//*		text: ...内容...
			//*	},
			//*	{
			//*		text: ...内容...
			//*	}]
			//*
			ajax(url, function (data) {
				var html = '';
				for (var i = 0, len = data.length; i < len; i++) {
					html + = "<li>" + data[i].text + "</li>";
				}
				contentUl.innerHTML = html;
			})
		}*/

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

		// 集成了原生ajax请求的函数
		function ajax(url,fnSucc,fnFail){              //fnSucc是成功时的处理程序，fnFail是失败时的处理程序
			//1.创建Ajax对象
			if(window.XMLHttpRequest){
				var oAjax=new XMLHttpRequest();
			}
			else{       //针对ie6
				var oAjax=new ActiveXObject("Microsoft.XMLHTTP");  
			}

			//2.链接服务器   open 三个参数（方法，文件名，是否异步）
			oAjax.open("GET",url,true);

			//3.发送请求
			oAjax.send();

			//4.接受返回
			oAjax.onreadystatechange=function(){
				// oAjax.readyState 提供信息浏览器和服务器进行到哪一步了
				if(oAjax.readyState==4){ //读取完成
					if(oAjax.status==200){
						fnSucc(oAjax.responseText);
					}
					else{
						if(fnFail){       //此函数存在
							fnFail(oAjax.status);
						}
					}
				} 
			}
		};
	}