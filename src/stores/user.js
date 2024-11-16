import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {



    // 模拟获取用户信息
    const user = {
      id: 0,
      username: 'test user',
      email: 'test@example.com',
      phone: '1234567890'
    }


  return {
    user
  }
})
