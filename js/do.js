/*
(function support_html5_storage() {
    try {
        return 'localStorage' in window || window['localStorage'] != null;
    } catch (e) {
        alert("您的浏览器不支持HTMLStorage");
        return false;
    }
})();
*/

//在本地保存JSON
function storeLocalStorage(obj) {
    localStorage.setItem('test', JSON.stringify(obj));
}

//提取本地存储的JSON
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("test"));
}




//测试用的JSON
var obj = {
    'list': {
        name: "list",
        list1: {
            name: "百度IFE",
            list1: "学习PS",
            list2: {
                name: "第三周任务",
                list1: "NextDo布局",
                list2: "NextDO动态效果"
            },
            list3: "学习布局"
        },
        list2: {
            name: "学习生活",
            list1: "学习IESS",
            list2: "宿舍节操值"
        },
        list3: {
            name: "项目",
            list1: "新传学院BUG修复",
            list2: "新传学院响应式布局",
        }
    }
};
//初始化列表


function initListAndTask(json) {
    //var xli = document.createElement("li");
    var listRow = $("#list_row");
    var listParent = $("#list_all");
    var classes = ['se-nav', 'th-nav', 'fo-nav'];
    var newNodes = createListAndTaskNode(obj['list'], 0);
    var activeLi = $(".task", newNodes);
    addClass(activeLi, "active");
    listParent.replaceChild(newNodes, listRow);
    initSumTask();
    addClickToTask(activeLi);
    
    //获得任务列表的节点
    function createListAndTaskNode(json, classT) {
        var li;
        var p;
        var ul = document.createElement('ul');
        for (x in json) {
            li = document.createElement("li");
            p = document.createElement("p");
            if (json[x] instanceof Object) {
                li.className = classes[classT] + " nav";
                li.setAttribute("data-type", "list");
                p.innerHTML = makeList(json[x]["name"], getTaskNum(json[x]));
                li.appendChild(p);
                li.appendChild(createListAndTaskNode(json[x], classT + 1));
            } else {
                if (x === "name") {
                    continue;
                }
                li.className = "task";
                li.innerHTML = makeTask(json[x]);
            }
            ul.appendChild(li);
        }
        return ul;
    }

    //获得任务的总数
    function initSumTask() {
        var taskSum = getTaskNum(obj["list"]);
        var list_sum = [];
        list_sum.push($("#list_sum"));
        list_sum.push($("#list_sum_all"));
        for (var i = 0; i < list_sum.length; i++) {
            list_sum[i].innerHTML = "&nbsp;(" + taskSum + ")";
        }
    }
}

//获取有多少个任务
function getTaskNum(json) {
    var num = 0;
    for (y in json) {
        if (json[y] instanceof Object) {
            num += getTaskNum(json[y]);
        } else if (y != "name") {
            num++;
        }
    }
    return num;
}

//给列表加上点击事件

function addClickToTask(lastActiveLi){
    var listAll = $("#list_all");
    addEvent(listAll,"click",function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        console.log(target.nodeName);
        if(target.className === "delete"){  
            //do something
        }else if(target.className === "task active"){
            return;
        }else{
            target = findParentTask(target);
            removeClass(lastActiveLi,"active");
            lastActiveLi = target;
            addClass(target,"active");
        }
    });
    
    function findParentTask(target){
        while(target.nodeName.toLowerCase() != "li"){
            target = target.parentNode;
        }
        return target;
    }
}
//制造一个分类节点
function makeTask(value) {
    return "<p>" + value + "<span class='delete'>×</span></p>";
}

//制造一个任务节点
function makeList(value, num) {
    return "<span>" + value + "</span><span class='list-num'>&nbsp;(" + num + ")</span><span class='delete'>×</span>";
}

//遮罩层toggle
function togglePopUp() {
    var pop = $("#popup");
    if (pop.style.display != "block") {
        pop.style.display = "block";
    } else {
        pop.style.display = "none";
    }
}

//添加新分类窗口的toggle
function toggleAddList() {
    var add = $("#add_new_list");
    if (add.style.display != "block") {
        add.style.display = "block";
    } else {
        add.style.display = "none";
    }
}

//获取新输入的类名
function getNewListValue() {
    var new_list_name = $("#new_list_name");
    var value = new_list_name.value;
    new_list_name.value = "";
    return value;
}

//在HTML添加新的分类
function addNewListToHtml(value) {
    var newList = document.createElement('li');
    newList.className = "th-nav nav";
    newList.setAttribute("data-type", "list");
    newList.innerHTML = "<p><span>" + value + "</span><span class='list-num'>&nbsp;(0)</span><span class='delete'>×</span></p<ul></ul>";
    getActiveList().appendChild(newList);
}

//在Json中添加新的分类
function addNewListToJson(json, value) {
    var parentName = getActiveListName();
    var resultJson = findListInJson(json, parentName);
    addValueToJson(value, resultJson);

    function addValueToJson(value, resultJson) {
        for (x in resultJson) {}
        var newListKey = x.substr(0, x.length - 1);
        var num = x.charAt(x.length - 1);
        num = parseInt(num) + 1;
        newListKey += num;
        var newListValue = {
            "name": value
        };
        resultJson[newListKey] = newListValue;
    }

    //找到保存目前目录的json对象
    function findListInJson(json, parentName) {
        if (json["name"] != parentName) {
            for (x in json) {
                if (json[x] instanceof Object) {
                    var tempResult = findListInJson(json[x], parentName);
                    if (tempResult instanceof Object) {
                        return tempResult;
                    }
                }
            }
        } else {
            return json;
        }
    }
}

//获取当前激活目标所属目录
function getActiveList() {
    var activeLi = $("#mian_nav .active");
    var parent = activeLi;
    while (parent.getAttribute("data-type") != "list") {
        parent = parent.parentNode;
    }
    return parent;
}

//获取激活目标目录的名字
function getActiveListName() {
    return getActiveList().children[0].children[0].textContent;
}


initListAndTask(obj);
(function() {
    var add_list = $("#add_list");
    add_list.onclick = function() {
        togglePopUp();
        toggleAddList();
    }
    var submit_new_list = $("#submit_new_list");
    submit_new_list.onclick = function() {
        togglePopUp();
        toggleAddList();
        var value = getNewListValue();
        if(value === ""){
            return;
        }
        addNewListToHtml(value);
        addNewListToJson(obj, value);
        console.log(obj);
    }
    var cancel_add_list = $("#cancel_add_list");
    cancel_add_list.onclick = function() {
        togglePopUp();
        toggleAddList();

    }
})();