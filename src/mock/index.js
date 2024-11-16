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

export default Mock


