/* 注册 开始 */
    var nameInp = document.querySelector('.username');
    var passInp = document.querySelector('.password');
    var errorInfo = document.querySelector('p');
    var form = document.querySelector('form');
    var reg = document.querySelector('.reg');
    var log = document.querySelector('.button'); //获取提交按钮
    reg.onclick = function(){
      console.log('111');
      form.onsubmit = function(){

          var uname = nameInp.value;
          var upass = passInp.value;
            
          if(!uname || !upass){
            form.insertBefore(document.createElement("p"),"div")
            p.innerHTML = ('用户名或密码不能为空');
            return;
          }
          // 发送ajax请求
          postSend('/register',function(res){
            var result = JSON.parse(res); //把json格式的数据解析成对象
            if(result.code === 0){
              errorInfo.style.display = 'block';
            }else{
             alert('验证成功');
            }
          },`username=${uname}&password=${upass}`)
        }
    }
        
    .button.onclick = function(){
      form.onsubmit = function(){
  
        if(!uname || !upass){
          form.insertBefore(document.createElement("p"),"div")
          p.innerHTML = ('用户名或密码不能为空');
          return;
        }
        // 发送ajax请求
        postSend('/login',function(res){
          var result = JSON.parse(res); //把json格式的数据解析成对象
          if(result.code === 0){
            errorInfo.style.display = 'block';
          }else{
            alert('验证成功');;
          }
        },`username=${uname}&password=${upass}`)
      }
    }


/* 注册 结束 */

/* 登录 开始 */

/* 登录 结束 */