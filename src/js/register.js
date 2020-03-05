var nameInp = document.querySelector('.username');
var passInp = document.querySelector('.password');
var errorInfo = document.querySelector('span');

var form = document.querySelector('form');
   
form.onsubmit = function(e){
    var e = e || window.event;
    e.preventDefault();
    var uname = nameInp.value;
    var upass = passInp.value;
    
    if(!uname || !upass){
    alert('用户名或密码不能为空');
    return;
    }
    // 发送ajax请求
    postSend('/register',function(res){
    var result = JSON.parse(res); //把json格式的数据解析成对象
    if(result.code === 0){
        errorInfo.style.display = 'block';
    }else{
        window.location.href = './index.html';
    }
    },`username=${uname}&password=${upass}`)
}

    
