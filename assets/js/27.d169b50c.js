(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{375:function(t,v,_){"use strict";_.r(v);var n=_(42),e=Object(n.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h3",{attrs:{id:"大文件的传输"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#大文件的传输"}},[t._v("#")]),t._v(" 大文件的传输")]),t._v(" "),_("ul",[_("li",[_("p",[t._v("数据压缩")]),t._v(" "),_("p",[t._v("浏览器可以发送"),_("strong",[t._v("Accept-Encoding")]),t._v("头部，服务端可以选择一种压缩算法，放入响应头中，将数据压缩后传给浏览器")]),t._v(" "),_("p",[t._v("但对于图片、音视频本身已经被压缩过，没有很大的作用，对文本文件有较好的压缩效果")])]),t._v(" "),_("li",[_("p",[t._v("分块传输")]),t._v(" "),_("p",[t._v("浏览器可以使用"),_("strong",[t._v("Transfer-Encoding: chunked")]),t._v("头部将一个文件进行分块传输")])]),t._v(" "),_("li",[_("p",[t._v("范围请求")]),t._v(" "),_("p",[t._v("浏览器可以使用"),_("strong",[t._v("Range: 10-90")]),t._v("(表示获取 10-90 范围的字节)向服务器发起范围请求，服务端收到 Range 请求后，会做以下几件事：")]),t._v(" "),_("ul",[_("li",[t._v("检查请求范围是否越界，如果越界，则返回 416，表示无法处理范围请求")]),t._v(" "),_("li",[t._v("请求范围合法，则返回 206，表示只是响应数据的一部分")]),t._v(" "),_("li",[t._v("响应头加上"),_("strong",[t._v("Content-Range")]),t._v("，表示该次请求的范围以及总的长度"),_("strong",[t._v("bytes x-y/length")])])])]),t._v(" "),_("li",[_("p",[t._v("多段数据")]),t._v(" "),_("p",[t._v("浏览器通过"),_("strong",[t._v("Range: bytes=0-50, 100-150")]),t._v("发起多段数据请求，服务端通过"),_("strong",[t._v("multipart/byteranges")]),t._v("和"),_("strong",[t._v("boundary=xxx")]),t._v("响应头进行相应")])])])])}),[],!1,null,null,null);v.default=e.exports}}]);