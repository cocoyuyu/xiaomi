 // 2-1. 准备一个变量
 var flag = true

 // 2-2. 准备一个变量接收数组
 var list2 = []

// 1. 请求数据
getList()
function getList() {
  $.ajax({
    url: '../lib/list.json',
    dataType: 'json',
    success: function (res) {

      // 2. 渲染分页器
      $('.pagi').pagination({
        pageCount: Math.ceil(res.length / 8), // 总页数
        current: 1, // 当前页
        jump: true,
        coping: true,
        homePage: '首页', // 首页按钮的文本
        endPage: '末页', // 末页按钮的文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
          // api.getCurrent() 获取当前是第几页
          let curr = api.getCurrent()

          // 根据是第几页, 从我的总数组里面筛选出一部分数据
          //   slice 方法包前不包后
          var list = res.slice((curr - 1) * 8, curr * 8)


          // 3-2. 每次使用分页器切换的时候渲染一次
          bindHtml(list)
        }
      })

      // 3. 先把第一页的数据渲染一次
      bindHtml(res.slice(0, 8))
      // 2-2. 给全局变量赋值
      list2 = res

    }
  })
}

function bindHtml(list) {
  // console.log(list)
  // 根据 list 数组渲染页面就可以了

  let str = ''

  list.forEach(item => {
    str += `
      <li>
        <img src="${ item.img }" alt="">
        <p>${ item.name }</p>
        <p>${ item.id }</p>
        <p>${ item.price }</p>
      </li>
    `
  })
  
  $('.box > ul').html(str)
}

/* 排序 */

 var btn = document.querySelector('.order')
 btn.onclick = function () {
   // 让准备好的变量改变
   flag = !flag

   // 不管是什么都要把数组重组
   list2.sort(function (a, b) {
     if (flag === true) {
       return a.id - b.id
     } else {
       return b.id - a.id
     }
   })

   // console.log(list)

    // 2. 渲染分页器
    $('.pagi').pagination({
        pageCount: Math.ceil(list2.length / 8), // 总页数
        current: 1, // 当前页
        jump: true,
        coping: true,
        homePage: '首页', // 首页按钮的文本
        endPage: '末页', // 末页按钮的文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
        // api.getCurrent() 获取当前是第几页
        let curr = api.getCurrent()

        // 根据是第几页, 从我的总数组里面筛选出一部分数据
        //   slice 方法包前不包后
        var list = list2.slice((curr - 1) * 8, curr * 8)


        // 3-2. 每次使用分页器切换的时候渲染一次
        bindHtml(list)
        }
    })

   // 3. 先把第一页的数据渲染一次
   bindHtml(list2.slice(0, 8))
 }