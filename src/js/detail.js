
    // 1. 获取 localStorage 里面的数据
    const info = JSON.parse(localStorage.getItem('goodsInfo'))

    // 2. 判断数据是否存在
    if (!info) {
      // 能执行表示 !info 是一个 true
      // 表示 info 是一个 false
      // 表示数据不存在
      alert('您要查看的数据不存在')
      // 跳转回列表页面
      window.location.href = './list.html'
    }

    // 3. 渲染页面
    bindHtml()
    function bindHtml() {
      $('.goodsInfo img').attr('src', info.img)
      $('.goodsInfo .goodsName').text(info.name)
      $('.goodsInfo .price').text('￥: ' + info.price)
    }

    // console.log(info)

    // 4. 点击添加购物车
    // 4-1. 添加点击事件
    $('.addCart').click(() => {
      // console.log('我要添加购物车了')

      // 4-2. 判断是否登录

      // 4-3. 加入到购物车数组里面
     
      const cartList = JSON.parse(localStorage.getItem('cartList')) || []

     
      let exits = cartList.some(item => {
        // 数组里面每一个的 id === 本页面的这条数据的 id
        return item.id === info.id
      })

      // console.log(exits)
      if (exits) {
     
        let data = null
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].id === info.id) {
            data = cartList[i]
            break
          }
        }
        // data 就是我找到的这个信息
        data.number++

        // 4-5. 数量添加的时候, 小计价格要改变
        data.xiaoji = data.number * data.price // 数量 * 单价
      } else {
        // 表示没有这个信息, 直接 push 就可以了
        // push 之前, 象里面添加一个 number 信息为 1
        info.number = 1

        // 4-5. 多添加一些信息
        info.xiaoji = info.price // 因为默认是第一个, 小计就是单价
        info.isSelect = false // 默认不选中
        cartList.push(info)
      }

      // 在存储到 localStorage 里面
      localStorage.setItem('cartList', JSON.stringify(cartList))
    })