 // 2-1. 准备一个变量
 var flag = true

 // 2-2. 准备一个变量接收数组（一页的数据）
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
      <li data-id="${ item.id }">
        <img src="${ item.img }" alt="">
        <p>商品名称：${ item.name }</p>
        <p>商品编号：${ item.id }</p>
        <p>价格：${ item.price } 元</p>
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

/* 往详情页的事件绑定 */
  //  事件委托的形式给每一个 li 添加点击事件
  $('.box > ul').on('click', 'li', function () {
    // this 就是你点击的那一个 li
    console.log(this)
    // 找到渲染这个 li 的数据
    // 从 list 数组里面找到这个数据
    // 点击 li 的时候, 拿到自己身上的 id 属性
    const id = $(this).data('id')

    // 2. 去到 list 这个数组里面找到一个 id 对应的数据
    //   这个数据就是渲染这个 li 的数据
    let data = null
    for (let i = 0; i < list2.length; i++) {
      if (list2[i].id === id) {
        data = list2[i]
        break
      }
    }
    // console.log(data) // 我要找到的渲染当前这个 li 的数据

    // 3. 把找到的数据存储到 localStorage 里面
    //   为了详情页面使用
    localStorage.setItem('goodsInfo', JSON.stringify(data))

    // 4. 跳转页面
    window.location.href = './detail.html'
  })