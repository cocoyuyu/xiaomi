"use strict";var nameInp=document.querySelector(".username"),passInp=document.querySelector(".password"),errorInfo=document.querySelector("span"),form=document.querySelector("form");form.onsubmit=function(e){(e=e||window.event).preventDefault();var o=nameInp.value,n=passInp.value;o&&n?postSend("/login",function(e){0===JSON.parse(e).code?errorInfo.style.display="block":window.location.href="./cart.html"},"username=".concat(o,"&password=").concat(n)):alert("用户名或密码不能为空")};