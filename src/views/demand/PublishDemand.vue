<template>
  <div class="publish-demand">
    <h2>发布需求</h2>
    <el-form
      ref="formRef"
      :model="demandForm"
      :rules="rules"
      label-width="100px"
      class="demand-form"
    >
      <el-form-item label="需求标题" prop="title">
        <el-input
          v-model="demandForm.title"
          placeholder="请输入需求标题"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="预算金额" prop="budget">
        <el-input-number
          v-model="demandForm.budget"
          :min="0"
          :precision="2"
          :step="100"
          placeholder="请输入预算金额"
        >
          <template #prefix>¥</template>
        </el-input-number>
      </el-form-item>

      <el-form-item label="需求类型" prop="type">
        <el-select v-model="demandForm.type" placeholder="请选择需求类型">
          <el-option
            v-for="item in demandTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="截止日期" prop="deadline">
        <el-date-picker
          v-model="demandForm.deadline"
          type="date"
          placeholder="选择截止日期"
          :disabled-date="disabledDate"
        />
      </el-form-item>

      <el-form-item label="详细描述" prop="description">
        <el-input
          v-model="demandForm.description"
          type="textarea"
          :rows="6"
          placeholder="请详细描述您的需求..."
          maxlength="1000"
          show-word-limit
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">发布需求</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref(null)

// 表单数据
const demandForm = reactive({
  title: '',
  budget: 0,
  type: '',
  deadline: '',
  description: ''
})

// 需求类型选项
const demandTypes = [
  { value: 'development', label: '开发' },
  { value: 'design', label: '设计' },
  { value: 'marketing', label: '营销' },
  { value: 'other', label: '其他' }
]

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入需求标题', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  budget: [
    { required: true, message: '请输入预算金额', trigger: 'blur' },
    { type: 'number', min: 0, message: '金额必须大于0', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择需求类型', trigger: 'change' }
  ],
  deadline: [
    { required: true, message: '请选择截止日期', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入需求描述', trigger: 'blur' },
    { min: 10, max: 1000, message: '描述长度在 10 到 1000 个字符', trigger: 'blur' }
  ]
}

// 禁用今天之前的日期
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}

// 发布需求API调用
const publishDemand = async (demandData) => {
  // TODO: 实现API调用
  // return await fetch('/api/demands', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(demandData),
  // })
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    await publishDemand(demandForm)
    ElMessage.success('需求发布成功！')
    router.push('/demands')
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style scoped>
.publish-demand {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.demand-form {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.el-input-number {
  width: 200px;
}

.el-select {
  width: 200px;
}
</style>
