import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: null,
    role: ''
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isDeveloper: (state) => state.role === 'developer',
    isEnterprise: (state) => state.role === 'enterprise'
  },

  actions: {
    async login(loginForm) {
      try {
        // 这里应该调用实际的登录 API
        // const response = await axios.post('/api/login', loginForm)

        // 模拟登录成功
        const mockResponse = {
          token: 'mock-token-123',
          user: {
            id: 1,
            username: loginForm.username,
            role: 'developer' // 或 'enterprise'
          }
        }

        this.token = mockResponse.token
        this.userInfo = mockResponse.user
        this.role = mockResponse.user.role

        localStorage.setItem('token', this.token)
        return mockResponse
      } catch (error) {
        throw error
      }
    },

    async getUserInfo() {
      try {
        // 这里应该调用实际的用户信息 API
        // const response = await axios.get('/api/user/info')

        // 模拟获取用户信息
        const mockUserInfo = {
          id: 1,
          username: 'test user',
          role: 'developer',
          email: 'test@example.com',
          phone: '1234567890'
        }

        this.userInfo = mockUserInfo
        this.role = mockUserInfo.role
        return mockUserInfo
      } catch (error) {
        throw error
      }
    },

    logout() {
      this.token = ''
      this.userInfo = null
      this.role = ''
      localStorage.removeItem('token')
    }
  }
})
