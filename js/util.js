/*

	任务2.1
*/

function isArray(arr) {
	return Object.prototype.toString.call(arr) === "[object Array]";
}
function isFunction(fn) {
	return Object.prototype.toString.call(fn) === "[object Function]";
}
/*
	使用递归实现深度克隆，暂时不会
*/
function cloneObject(src) {
    return;
}
/*
	数组去重
*/
function uniqArray(arr) {
	if (!isArray(arr)) {return null; }
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < newArr.length; j++) {
		 if (newArr[j] === arr[i]) {
		 	break;
		 };
		};
		if (j == newArr.length) {
			newArr.push(arr[i]);
		};
		/*if(newArr.indexOf(arr[i])==-1){
			newArr.push(arr[i]);
		}*/
	};
	return newArr;
}
/*
	这是网上百度的方法，ie8 中没有indexOf方法
function unique(arr) {
  var ret = []
  var hash = {}
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]
    var key = typeof(item) + item
    if (hash[key] !== 1) {
      ret.push(item)
      hash[key] = 1
    }
  }
  return ret;
}

*/

/*
	对字符串去头尾，不用正则表达式
*/
function trim(str){
	var newStr = "";
	var i = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i)!="\/t") {
			break;
		};
	};
	str.substring(i,str.length);
	return str;
}
/*
	遍历一个数组，对数组的每一个元素执行Fn元素
*/
function each(arr,fn){
	for (var i = 0; i < arr.length; i++) {
		fn(arr[i],i);
	};
}
/*
	获取一个对象里面第一层元素的数量
*/
function getObjectLength(obj){
	var len = 0;
	for(var x in obj){
		len++;
	}
	return len;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
	var reg = /^[a-zA-Z0-9]+@[a-z0-9]+(.[a-z]+)+$/;
    return reg.test(emailStr);
};
// 判断是否为手机号
function isMobilePhone(phone){
	var reg = /1[0-9]{10}/;
	return reg.test(phone);
}



/*
	任务3.1
*/

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	var classes = element.className.split(" ");
	for (var i = 0; i < classes.length; i++) {
		if(classes[i] == newClassName){
			return;
		}
	};
    element.className =  element.className + " "+ newClassName;
};

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var classes = element.className.split(" ");
    var newClassName = "";
	for (var i = 0; i < classes.length; i++) {
		if(classes[i] == oldClassName){
			continue;
		}
		newClassName = newClassName + classes[i] +" ";
		element.className = newClassName.slice(0,newClassName.length-1);
	};
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode === siblingNode.parentNode;
};

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var x = 0;
    var y =0;
    if (element.offsetParent) {
    	x += element.offsetLeft+element.offsetParent.clientLeft;
    	y += element.offsetTop;
    	element = element.offsetParent;
    };
    return {x:x,y:y};
}

// 实现一个简单的Query
function $(selector, context) {
	context = context || document;
	//console.log(context);
	var element;
	var type = -1;
	var firstw = selector.charAt(0);
	var selectors = selector.split(" ");
	//console.log(context);
	var nextSlector = selector.slice(selectors[0].length+1,selector.length);
	if (firstw=="#") {
		element = context.getElementById(selectors[0].slice(1,selectors[0].length));
	}else if(firstw=="."){
		var tags = context.getElementsByTagName('*');
		var classReg = new RegExp("\\b"+selectors[0].slice(1,selectors[0].length)+"\\b");
		//console.log(classReg);
		//console.log(tags);
		for (var i = 0; i < tags.length; i++) {
			if (classReg.test(tags[i].className)) {
				element = tags[i];
				break;
			};
		};
	}else if(firstw="["){
		var datas = selectors[0].split('=');
		var dataName = datas[0];
		var dataValue = datas[1];
		if (!dataValue) {
			dataName = dataName.slice(1,dataName.length-1);
		}else{
			dataValue = dataValue.slice(0,dataValue.length-1);
			dataName = dataName.slice(1,dataName.length);
		}
		var tags = context.getElementsByTagName('*');
		for (var i = 0; i < tags.length; i++) {
			if (tags[i].getAttribute(dataName)===null) {
				continue;
			};
			if (!dataValue) {
				element = tags[i];
				break;	
			}else if(tags[i].getAttribute(dataName)==dataValue){
				//alert(dataValue);
				element = tags[i];
				break;
			}
		};
	}
	//console.log(element);
	if (selectors.length<=1) {
		return element;
	}else{
		//alert(3);
		return $(nextSlector,element);
	}
	
}



/*
	任务4.1
*/


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
    	element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
    	element.attachEvent("on"+event,listener);
    }
}


// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if (element.addEventListener) {
    	element.removeEventListener(event,listener,false);
    }else if(element.detachEvent){
    	element.detachEvent(event,listener);
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    if (element.addEventListener) {
    	element.addEventListener('click',listener,false);
    }else if(element.attachEvent){
    	element.attachEvent("onclick",listener);
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element,'keypress',function(e){
    	var event = e || window.event;
    	if (event.keyCode == 13) {
    		listener();
    	};
    });
}

$.on = function(selector, event, listener) {
    // your implement
    addEvent($(selector),event,listener);
};

$.click = function(selector, listener) {
    // your implement
    addEvent($(selector),'click',listener);
}

$.un = function(selector, event, listener) {
    // your implement
    removeEvent($(selector),event);
}

$.delegate = function(selector, tag, event, listener) {
    // your implement
    addEvent($(selector),event,function(){
    	var ev = arguments[0] || window.event;
    	var target = ev.srcElement || ev.target;
    	if (target.nodeName.toLowerCase() == tag) {
    		listener.call(target);
    	};
    });
}


/*
	任务5.1
*/

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var isIEVersion = function(ver) {
    	var b = document.createElement('b');
    	b.innerHTML = "<!--[if IE " + ver +"]><i></i><![endif]>-->";
    	return b.getElementsByTagName("i").length === 1;
    }
   for (var i = 6; i <= 11; i++) {
    	if (isIEVersion(i)) {
    		return i;
    	};
    };
    return -1;
}
/*
	网上找的利用正则表达式
	$(function () {
	    var Sys = {};
	    var ua = navigator.userAgent.toLowerCase();
	    var s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
	    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	    
	    if (Sys.ie) $('span').text('IE: ' + Sys.ie);
	    if (Sys.firefox) $('span').text('Firefox: ' + Sys.firefox);
	    if (Sys.chrome) $('span').text('Chrome: ' + Sys.chrome);
	    if (Sys.opera) $('span').text('Opera: ' + Sys.opera);
	    if (Sys.safari) $('span').text('Safari: ' + Sys.safari);
	});
*/

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if (typeof expiredays == "number") {
    	cookie += "; max-age=" +(expiredays*60*60*24);
    };
    document.cookie = cookie;
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    var all = document.cookie;
    if (all === "") {return};
    var list = all.split("; ");
    for (var i = 0; i < list.length; i++) {
    	if(decodeURIComponent(list[i].split("=")[0]) == cookieName){
    		return decodeURIComponent(list[i].split("=")[1]);
    	};
    };

}

/*
	任务6.1
*/
//封装一个ajax
function ajax(url, options) {
    // your implement
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
    	xmlhttp = new XMLHttpRequest();
    }else if(window.ActiveXObject){
    	xmlhttp = new ActiveXObjct("Microsoft.XMLHTTP");
    }
    if(xmlhttp!=null){
    	xmlhttp.onreadystatechange = state_Change;
    	if (options.type.toLowerCase() == "get") {
    		url = addURLParam(url,options.data);
            xmlhttp.open(options.type,url,true);
    		xmlhttp.send(null);
    	}else if(options.type.toLowerCase() == "post"){
    		xmlhttp.open(options.type,url,true);
    		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    		xmlhttp.send(addPostParam(options.data));
    	}else{
    		return;
    	}
    }else{
    	return;
    }
    function state_Change(){
    	if (xmlhttp.readyState==4&&xmlhttp.status==200) {
    		options.onsuccess(xmlhttp.responseText,xmlhttp.responseXML);
    	}else{
    		return;
    	}
    }
    function addURLParam(url,data){
        for(var i in data){
            url += url.split("?").length>1?"&":"?";
            url += encodeURIComponent(i)+"="+encodeURIComponent(data[i]);
        }
        return url;
    }
    function addPostParam(data){
    	var params="";
    	for(var i in data){
    		params += params==""?"":"&";
    		params += encodeURIComponent(i)+"="+encodeURIComponent(data[i]);
    	}
    	return params;
    }
}