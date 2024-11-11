<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <h2 class="title">并行计算案例展示平台</h2>
        <p class="subtitle">请登录您的账号</p>

        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
              size="large"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              size="large"
              show-password
            />
          </el-form-item>

          <div class="options">
            <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            <el-button link type="primary" @click="forgotPassword">忘记密码？</el-button>
          </div>

          <el-button
            type="primary"
            class="login-button"
            size="large"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form>

        <div class="register">
          <span>还没有账号？</span>
          <el-button link type="primary" @click="goToRegister">立即注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能小于3位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  loading.value = true
  try {
    await userStore.login(loginForm)
    await userStore.getUserInfo()
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  // 实现忘记密码逻辑
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.login-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  margin: 0 auto;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 32px;
}

.login-form {
  margin-top: 20px;
}

.login-form :deep(.el-input) {
  --el-input-hover-border-color: #8b5cf6;
  --el-input-focus-border-color: #8b5cf6;
}

.login-form :deep(.el-input__wrapper) {
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e5e7eb;
}

.login-form :deep(.el-input__wrapper:hover) {
  border-color: #8b5cf6;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 24px;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  background: #6366f1;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.login-button:active {
  transform: translateY(1px);
}

.register {
  margin-top: 24px;
  text-align: center;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .login-container {
    padding: 20px;
  }

  .login-box {
    padding: 30px 20px;
  }
}
</style>
