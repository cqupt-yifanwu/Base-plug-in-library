window.onload = function () {
	var ctsList = document.getElementById('pageMain');
	var pageNav = document.getElementById('pageNav');     // 分页的下标
	var prev = document.getElementById('prev'); 		  // 上一页
	var next = document.getElementById('next'); 		  // 下一页
	var obj = {
		branches: 7,
		ctsList: ctsList,
		pageNav: pageNav,
		prev: prev,
		next: next
	}
	pageControl(obj);  // 调用并传入参数
}