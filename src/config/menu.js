const menuList = [
  {
    key: '/home',
    title: '首页',
    icon: 'home'
  },
  {
    key: '/products',
    title: '商品',
    icon: 'appstore',
    children: [
      {
        key: '/category',
        title: '品类管理',
        icon: 'bars'
      },
      {
        key: '/product',
        title: '商品管理',
        icon: 'tool'
      }
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },

  {
    title: '订单管理',
    key: '/order',
    icon: 'windows',
  },
]
export default menuList