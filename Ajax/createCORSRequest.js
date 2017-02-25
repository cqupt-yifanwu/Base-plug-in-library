// 跨浏览器实现CROS跨域的问题
function createCORSRequest (method, url) {
	var xhr = new XMLHttpRequest();
	// 判断是否带凭据（cookie）
	if ("withCredentials" in xhr) {
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}

var request = createCORSRequest("get","http://www.xxx");
if (request) {
	request.onload = function () {
		 // 对request.responseText 进行处理
	};
	request.send();
}