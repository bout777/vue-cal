<template>
  <div class="profile">
    <el-card class="profile-card">
      <div class="user-info">
        <div class="avatar-section">
          <el-avatar :size="100" :src="userInfo.avatar">
            <el-icon><UserFilled /></el-icon>
          </el-avatar>
          <el-button type="primary" link @click="handleAvatarUpload" v-if="canEdit">
            更换头像
          </el-button>
        </div>
        <div class="info-details">
          <h3>{{ userInfo.name }}</h3>
          <p class="user-role">开发者</p>
        </div>
      </div>

      <el-divider />

      <div class="contact-info">
        <h3>联系方式
          <el-button type="primary" link @click="startEdit" v-if="!isEditing&&canEdit">
            编辑
          </el-button>
        </h3>

        <div class="info-form" v-if="isEditing">
          <el-form :model="editForm" label-width="80px">
            <el-form-item label="邮箱">
              <el-input v-model="editForm.email" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="editForm.phone" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveChanges">保存</el-button>
              <el-button @click="cancelEdit">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="info-display" v-else>
          <div class="info-item">
            <el-icon><Message /></el-icon>
            <span class="label">邮箱：</span>
            <span>{{ userInfo.email }}</span>
          </div>
          <div class="info-item">
            <el-icon><Phone /></el-icon>
            <span class="label">手机：</span>
            <span>{{ userInfo.phone }}</span>
          </div>
        </div>
      </div>

      <el-divider />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { UserFilled, Message, Phone } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import service from '@/utils/request'

const isEditing = ref(false)

const route = useRoute()
const userStore = useUserStore()

const userInfo = ref({})

const editForm = ref({
  email: '',
  phone: ''
})

onMounted(async () => {
  if (route.params.userId === userStore.user.id) {
    userInfo.value = userStore.user
    canEdit.value = true
  } else {
    canEdit.value = false
    //TODO:此处调用请求用户信息
    const response = await service.get(`/api/user/${route.params.userId}`)
    userInfo.value = response.data.data
  }

})

const canEdit = ref(false)

const startEdit = () => {
  editForm.value.email = userInfo.value.email
  editForm.value.phone = userInfo.value.phone
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveChanges = async () => {
  try {
    // 这里应该调用API保存修改
    userInfo.value.email = editForm.value.email
    userInfo.value.phone = editForm.value.phone
    isEditing.value = false
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleAvatarUpload = () => {
  // 实现头像上传逻辑
  ElMessage.info('头像上传功能待实现')
}
</script>

<style scoped>
.profile {
  position: relative;
  padding: 0px;
}

.profile-card {
  max-width: 800px;
  margin: 0 auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.info-details h3 {
  margin: 0 0 10px 0;
}

.user-role {
  color: #666;
  margin: 0;
  font-size: 14px;
}

.contact-info {
  padding: 20px 0;
}

.contact-info h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #666;
}

.info-item .el-icon {
  margin-right: 8px;
  color: #409EFF;
}

.info-item .label {
  margin-right: 10px;
  color: #333;
}

.info-form {
  max-width: 400px;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

.stat-item {
  text-align: center;
}

.stat-item h4 {
  color: #666;
  margin: 0 0 10px 0;
}

.stat-item p {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #409EFF;
}
</style>
