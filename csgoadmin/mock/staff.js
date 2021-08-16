const groups = [
  {
    id: 0,
    name: '第七大道',
    isgroup: true,
    group: [
      {
        id: 1,
        name: '研发中心',
        isgroup: true,
        group: [
          {
            id: 2,
            name: '研发中心办',
            isgroup: false,
          }, 
          {
            id: 3,
            isgroup: false,
            name: '技术部',
            group: []
          }
        ]
      },
      {
        id: 4,
        name: '法务中心',
        isgroup: true,
        group: [
          {
            id: 5,
            name: '法务部',
            isgroup: false,
          },
          {
            id: 6,
            name: '投资部',
            isgroup: false,
          }
        ]
      }
    ]
  }
]
const staffs = [
  {
    id: 60094,
    name: 'yanbk',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    title: 'WEB前端开发工程师',
    mobile: '13122735753',
    email: 'bingkun.yan@7road.com',
    number: 60094,
    class: '无锡第七大道/研发中心/技术部',
    classNum: 2,
    roles: ['admin']
  },
  {
    id: 60095,
    name: 'yanbk',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    title: 'WEB前端开发工程师',
    mobile: '13122735753',
    email: 'bingkun.yan@7road.com',
    number: 60095,
    class: '无锡第七大道/研发中心/技术部',
    classNum: 3,
    roles: ['admin']
  },
  {
    id: 60096,
    name: 'yanbk',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    title: 'WEB前端开发工程师',
    mobile: '13122735753',
    email: 'bingkun.yan@7road.com',
    number: 60096,
    class: '无锡第七大道/研发中心/技术部',
    classNum: 5,
    roles: ['admin']
  },
  {
    id: 60097,
    name: 'yanbk',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    title: 'WEB前端开发工程师',
    mobile: '13122735753',
    email: 'bingkun.yan@7road.com',
    number: 60097,
    class: '无锡第七大道/研发中心/技术部',
    classNum: 6,
    roles: ['admin']
  },
]
  
export default [
  // user login
  {
    url: '/vue-admin-template/staff/getGroup',
    type: 'post',
    response: config => {
      // console.log(config)
      return {
        code: 20000,
        data: groups
      }
    }
  },

  {
    url: '/vue-admin-template/staff/getStaff',
    type: 'post',
    response: config => {
      const { id } = config.body
      console.log(id);
      var res = staffs.filter(item => item.classNum == id)
      console.log(res)
      return {
        code: 20000,
        data: res
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/staff/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
  