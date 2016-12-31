   $(function(){
		var oBtn1 = $('#btn1');
		var oUl1 = $('#photoUl');
		var oBigPic = $('.mainBigPic img')
		var li = $("#photoUl li");
	    var a = 1;                      //当前大图显示的图片index
	    var timer = null;

	    oBtn1.click(function () {                 //添加图片
	    	if(li.length >= 20) {
	    		alert("相册的数量已经达到上限！");
	    	}else {
	    		oUl1.append($('<li></li>'));
	    	}
	    	$("li:empty").html(' <img src="images/photo/tu0'+(++li.length)+'.jpg" />');
	    });

	 //    function changePic (index) {
		// 	oBigPic.css("display","none")	//先隐藏后面才可以渐显
		// 	.attr("src","images/photo/tu0"+ index +".jpg")
		// 	.stop(true, true).fadeIn(600);  
		// };
	     
	 //    function play(){               //图片自动轮播函数
		// 	if(++a > li.length){
		// 		a = 1;
		// 	}
		// 	changePic(a);      
		// }

		// timer = setInterval(play,2000);

		// 左右切换图片按钮
		// $(".turn").click(function(e){
		// 	clearInterval(timer);
		// 	if($(e.target).parent().attr('id')=='left'){
		// 		if(a-1<1){ a = a-1+li.length; }
		// 		else{a = a-1;}
		// 		changePic(a);
		// 	}
		// 	else{
		// 		if(a+1>li.length){a = 1;}
		// 		else{a = a+1;}
		// 		changePic(a);      
		// 	}
		// 	timer = setInterval(play,2000);
		// });
	  
		$(oUl1).click(function(e){
			clearInterval(timer);
			a = $(e.target).parent().index() + 1;    // 最底层的是img  再往上一层就是li
			changePic(a);      
			timer = setInterval(play,2000);
		})
		.mouseover(function(e){                      //鼠标移入移除效果。
			$(e.target).css('opacity', '0.5');
		})
		.mouseout(function(e){
			$(e.target).css('opacity', '1');
		});
})
   var doc = document;
var obj = {
	"photos": doc.getElementById('photoUl').getElementsByTagName('img'),
	"contImg": doc.getElementById('bigImg'),
	"speed": 2000,
	"leftBtn": doc.getElementById("left"),
	"rightBtn" doc.getElementById("right")
}
carousel (obj);