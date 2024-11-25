import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import service from '@/utils/request'
import { ElMessage } from 'element-plus'
export const useUserStore = defineStore('user', () => {

    const token = ref('')
    const localUserId = ref(null)
    const login = async (loginForm) => {
      const res = await service.post('/login', loginForm)
      if(res.data.code === 200){
        token.value = res.data.data.token
        localStorage.setItem('token', token.value)
        localUserId.value = res.data.data.userId
      }else{
        throw new Error(res.data.message)
      }
    }
  return {
    localUserId,
    login,
    token
  }
})
