function ajax (meath, url, ascyn, data, fn) {
	function creatXHR () {
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		// 在ie7以前XHR对象是通过MSXML库中的一个ActiveX对象实现的，并且在ie中可能会遇到三种不同版本的XHR，下面的方法做兼容
		} else if (typeof ActiveXObject != "undefined") {
			if (typeof arguments.callee.activeXString != "String") {
				var versions = ["MSXML.XMLHttp.6.0", "MSXML.XMLHttp.3.0", "MSXML.XMLHttp"],
					i, len; 
				for (i = 0, len = versions.length; i < len; i++) {
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch (ex) {
						// 跳过
					}
				}
			}
		} else {
			throw new Error("No XHR object available");
		}
	}
	var xhr = creatXHR();

	xhr.onreadystatechange == function () {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				fn(xhr.responseText);
			}
		}
	}
	  //格式化参数
	(function formatParams(url) {
	    var arr = [];
	    for(var name in url) {
	      // arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(url[name]));
	      arr.push(name + '=' + data[name]);
	    };
	    // 添加一个随机数，防止缓存
	    arr.push('v=' + Math.floor(Math.random() * 10000 + 500));
	    return arr.join('&');
	})(url);

	// 第一步，第三个值表示是否异步请求的布尔值
	xhr.open(meath, url, ascyn);

	/*
		在这两个步骤中间我们可以调用 setRequertHeader() 方法
	*/ 
	// 当是post方法的时候要设置其头部模仿表单提交的方式（告诉服务器）。
	if(meath == "post") {
		xhr.setRequertHeader("Content-Type", "application/x-www-form-urlencoded");
	}

	// 第二步，可以发送数据
	xhr.send(data);

	// 另外在接受到响应之前还可以调用abort（）方法来取消异步
}