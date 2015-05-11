// 实现一个简单的Query
function $(selector, context) {
    context = context || document;
    var element;
    var type = -1;
    var firstw = selector.charAt(0);
    var selectors = selector.split(" ");
    var nextSlector = selector.slice(selectors[0].length + 1, selector.length);
    if (firstw == "#") {
        element = context.getElementById(selectors[0].slice(1, selectors[0].length));
    } else if (firstw == ".") {
        var tags = context.getElementsByTagName('*');
        var classReg = new RegExp("\\b" + selectors[0].slice(1, selectors[0].length) + "\\b");
        for (var i = 0; i < tags.length; i++) {
            if (classReg.test(tags[i].className)) {
                element = tags[i];
                break;
            };
        };
    } else if (firstw = "[") {
        var datas = selectors[0].split('=');
        var dataName = datas[0];
        var dataValue = datas[1];
        if (!dataValue) {
            dataName = dataName.slice(1, dataName.length - 1);
        } else {
            dataValue = dataValue.slice(0, dataValue.length - 1);
            dataName = dataName.slice(1, dataName.length);
        }
        var tags = context.getElementsByTagName('*');
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].getAttribute(dataName) === null) {
                continue;
            };
            if (!dataValue) {
                element = tags[i];
                break;
            } else if (tags[i].getAttribute(dataName) == dataValue) {
                element = tags[i];
                break;
            }
        };
    }
    if (selectors.length <= 1) {
        return element;
    } else {
        return $(nextSlector, element);
    }

}

//添加一个新类名
function addClass(element, newClassName) {
	var classes = element.className.split(" ");
	for (var i = 0; i < classes.length; i++) {
		if(classes[i] == newClassName){
			return;
		}
	};
    element.className =  element.className + " "+ newClassName;
};
