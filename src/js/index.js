/* nav开始 */

getList()
function getList() {
  $.ajax({
    url: '../lib/nav_top.json',
    dataType: 'json',
    success: function (res) {
      // console.log(res)

      // 4-1. 准备一个空字符串
      let str = ''

      // 4-2. 渲染一级的 li
      res.forEach(item => {
        str += `<li>${ item.name }</li>`
      })

      // 4-3. 填充到 nav_top 里面的 ul 里面
      $('.nav_top > ul')
        .html(str)
        .on({
          mouseenter: () => $('.nav_box').stop().slideDown(),
          mouseleave: () => $('.nav_box').stop().slideUp()
        })
        .children('li') // 找到所有的一级菜单下的 li
        .on('mouseover', function () {
          // 5-1. 记录自己移入的是哪一个 li
          const index = $(this).index()
          // 5-2. 找到要渲染的数组
          const list = res[index].list
          // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
          let str = ''

          // 5-4. 进行组装
          list.forEach(item => {
            str += `
              <li>
                <div>
                  <img src="${ item.list_url }" alt="">
                </div>
                <p class="title">${ item.list_name }</p>
                <span class="price">${ item.list_price }</span>
              </li>
            `
          })

          // 5-5. 填充到页面里面
          $('.nav_box > ul').html(str)
        })
        $('.nav_top li').on(
            {
                mouseover: function(){
                    $(this).css('color','orangered')
                },
                mouseout: function(){
                    $(this).css('color','#333')
                }
            }
        )

      // 4-4. 给 nav_box 添加一个移入移出事件
      $('.nav_box')
        .on({
          mouseover: function () { $(this).finish().show()
         },
          mouseout: function () { $(this).finish().slideUp() }
        })
    }
  })
}

/* 横排 nav_list渲染 开始 */
getList2()
function getList2() {
  $.ajax({
    url: '../lib/nav_list.json',
    dataType: 'json',
    success: function (res) {
      // console.log(res)

      // 4-1. 准备一个空字符串
      let str = ''

      // 4-2. 渲染一级的 li
      res.forEach(item => {
        str += `<li>${ item.name }</li>`
      })
      $('.nav_list > ul').html(str)
    }
  })
}
/* 横排 nav_list渲染 结束 */

/* nav结束 */

/* 轮播图开始 */
var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: {
      delay: 2000
    },
    effect: 'cube',

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
/* 轮播图结束 */