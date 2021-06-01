//获取房屋状态
function state(house_state){
    document.getElementById("house_state").value=house_state
}

var aa = [];

//后端新增房屋信息
function save(){
    if(confirm(" 你确定要新增此房源吗？ ")){
        var contact = new Object;
        contact.house_id = document.getElementById("house_id").value;
        contact.house_name = document.getElementById("house_name").value;
        contact.house_area = document.getElementById("house_area").value;
        contact.location = document.getElementById("location").value;
        contact.house_type = document.getElementById("house_type").value;
        contact.rent = document.getElementById("rent").value;
        contact.house_state = document.getElementById("house_state").value;
        contact.tel = document.getElementById("tel").value;
        var str = JSON.stringify(contact);
        if(localStorage.getItem("houses") == null){
            aa.push(str);
            localStorage.setItem("houses",JSON.stringify(aa));
        }else {
            var hh = JSON.parse(localStorage.getItem("houses"));
            hh.push(str);
            localStorage.setItem("houses",JSON.stringify(hh));
        }
        window.location.href="houseAdd.html";
    }
    else return false;

}


//删除单个房屋信息
function removeStorage(id) {
    if(confirm(" 你确定要删除此房源吗？ ")){
        var hh = JSON.parse(localStorage.getItem("houses"));
        hh.splice(
            hh.indexOf(hh.find(function(element){ return element.house_id === id; }))
            , 1);
        console.log(hh);
        localStorage.setItem("houses",JSON.stringify(hh));
        window.location.href="housesRoot.html"
    }
    else return false;
}


