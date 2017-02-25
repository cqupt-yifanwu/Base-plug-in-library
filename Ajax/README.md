### ajax

#### 插件相关
- 将ajax封装成函数五个参数 meath（请求方法）, url（地址）, ascyn（是否异步）, data（要发送的数据）, fn（成功的回调函数）

#### ajax 进度事件
- loadstart：在接受到响应数据的第一个字节时触发
- progress： 在接受响应期间持续不断的触发
 onprogress时间处理程序会接受到一个event对象，其target属性就是xhr对象。他还包含着额外三个属性：
  - lengthComputable：表示进度信息是否可用的布尔值
  - position：表示已经接收的字符串
  - totalSize：根据Content-Length响应头部确定的预期字节数 
- error： 在请求发生错误时触发
- abort： 在因为调用abort()方法而终止链接时触发
- load：在接受到完整的数据时触发
- loadend：在通信完成或者触发error、abort、load事件后触发