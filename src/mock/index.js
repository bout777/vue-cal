import Mock from 'mockjs'

const mockUser = Mock.mock({
  'users|20': [{
    'id|+1': 1,
    'username': '@cname',
    'avatar': '@image("200x200", "#4A7BF7")',
    'email': '@email',
    'phone': /^1[3-9]\d{9}$/,
    'bio': '@cparagraph(1)',
  }]
})

// 拦截 GET 请求，匹配 /api/users/:id 格式的URL
Mock.mock(/\/api\/user\/\d+/, 'get', (options) => {
  // 从URL中提取用户ID
  const id = parseInt(options.url.match(/\/api\/user\/(\d+)/)[1])

  // 在模拟数据中查找对应ID的用户
  const user = mockUser.users.find(user => user.id === id)

  if (user) {
    return {
      code: 200,
      data: user,
      message: '获取用户信息成功'
    }
  } else {
    return {
      code: 404,
      data: null,
      message: '用户不存在'
    }
  }
})

Mock.mock(/\/login/, 'post', (options) => {
  // 对于 POST 请求，options.body 会包含请求数据
  const requestData = JSON.parse(options.body)

  // 可以根据请求数据返回不同的响应
  if (requestData.username === 'admin' && requestData.password === '123456') {
    return {
      code: 200,
      data: { token: '1234567890', userId: 1 },
      message: '登录成功'
    }
  } else {
    return {
      code: 401,
      data: null,
      message: '用户名或密码错误'
    }
  }
})


Mock.mock(/\/api\/reply\/\d+/, 'get', (options) => {
  const id = parseInt(options.url.match(/\/api\/reply\/(\d+)/)[1])
  return {
    code: 200,
    data: {
      id: id,
      content: '这是一条回复内容',
      author: {
        id: 1,
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/50'
      },
      createTime: '2023-06-01T12:34:56Z'
    },
    message: '获取回复成功'
  }
}
)

Mock.mock(/\/api\/replyIdList\/\d+/, 'get', (options) => {
  return {
    code: 200,
    data:{
      replyIdList: [1,2,3,4,5,6,7,8,9,10]
    }
  }
})

export default Mock


