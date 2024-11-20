import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {



    // 模拟获取用户信息
    const user = {
      id: 0,
      username: 'test user',
      avatar: 'https://via.placeholder.com/150',
      bio: 'test bio',
      email: 'test@example.com',
      phone: '1234567890'
    }


  return {
    user
  }
})
