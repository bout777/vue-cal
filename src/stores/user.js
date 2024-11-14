import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)
  const role = ref('')

  // getters
  const isLoggedIn = computed(() => !!token.value)
  const isDeveloper = computed(() => role.value === 'developer')
  const isEnterprise = computed(() => role.value === 'enterprise')

  // actions
  async function login(loginForm) {
    // 这里应该调用实际的登录 API
    const response = await service.post('/login', loginForm)

    // 模拟登录成功
    const mockResponse = {
      token: 'mock-token-123',
      user: {
        id: 1,
        username: loginForm.username,
        email: loginForm.email,
        phone: loginForm.phone,
        role: 'developer' // 或 'enterprise'
      }
    }

    token.value = mockResponse.token
    userInfo.value = mockResponse.user
    role.value = mockResponse.user.role

    localStorage.setItem('token', token.value)
    return mockResponse
  }

  async function getUserInfo() {
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

    userInfo.value = mockUserInfo
    role.value = mockUserInfo.role
    return mockUserInfo
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    role.value = ''
    localStorage.removeItem('token')
  }

  return {
    // state
    token,
    userInfo,
    role,
    // getters
    isLoggedIn,
    isDeveloper,
    isEnterprise,
    // actions
    login,
    getUserInfo,
    logout
  }
})
