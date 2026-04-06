<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Calendar, Message, Check, Star, ArrowRight } from '@element-plus/icons-vue'

const formRef = ref()
const isSubmitting = ref(false)
const submitSuccess = ref(false)

const formData = reactive({
  name: '',
  email: '',
  company: '',
  serviceType: '',
  budget: '',
  message: ''
})

const serviceOptions = [
  { value: 'ai-team', label: 'AI 团队搭建咨询' },
  { value: 'one-person-company', label: '一人公司咨询' },
  { value: 'workflow', label: 'AI 工作流优化' },
  { value: 'other', label: '其他咨询' }
]

const budgetOptions = [
  { value: '500-1000', label: '500-1000 元' },
  { value: '1000-3000', label: '1000-3000 元' },
  { value: '3000-5000', label: '3000-5000 元' },
  { value: '5000+', label: '5000 元以上' }
]

const faqs = [
  {
    question: '咨询流程是怎样的？',
    answer: '提交表单后，我会在 24 小时内与你联系，了解具体需求。然后我们会安排一次 30-60 分钟的线上视频会议，深入讨论你的问题和解决方案。'
  },
  {
    question: '适合什么样的场景？',
    answer: '适合想要搭建 AI 团队的个人创业者、想要用 AI 工具提升效率的中小企业、或者对 AI 产品落地有疑问的团队负责人。'
  },
  {
    question: '咨询后能获得什么？',
    answer: '你将获得一份针对性的 AI 落地建议文档、会议录音、以及后续的文字跟进。如果选择深度咨询，还包含方案文档和工具链配置。'
  },
  {
    question: '可以先试用吗？',
    answer: '当然可以。你可以先预约一次 15 分钟的免费初步沟通，让我了解你的需求后再决定是否继续合作。'
  }
]

const validateEmail = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入邮箱'))
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    callback(new Error('请输入有效的邮箱地址'))
  } else {
    callback()
  }
}

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
  serviceType: [{ required: true, message: '请选择服务类型', trigger: 'change' }]
}

const packages = [
  {
    name: '初步咨询',
    price: '免费',
    duration: '15 分钟',
    description: '了解你的需求，判断是否适合合作',
    features: ['需求初步沟通', '问题诊断', '合作建议'],
    highlighted: false
  },
  {
    name: '深度咨询',
    price: '999',
    duration: '60 分钟',
    description: '深入分析问题，提供具体解决方案',
    features: ['深度问题分析', '定制化方案', '工具链建议', '会后文字总结'],
    highlighted: true
  },
  {
    name: '长期顾问',
    price: '4999',
    duration: '3 个月',
    description: '持续陪伴式指导，陪你从 0 到 1',
    features: ['不限次数咨询', '方案文档', '工具链配置', '定期复盘', '优先支持'],
    highlighted: false
  }
]

const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    isSubmitting.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    submitSuccess.value = true
    isSubmitting.value = false
  } catch (error) {
    console.error('Form validation failed:', error)
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
  submitSuccess.value = false
}
</script>

<template>
  <div class="consulting-view">
    <div class="consulting-hero">
      <div class="hero-content">
        <h1 class="page-title">咨询服务</h1>
        <p class="page-subtitle">AI 团队搭建 · 一人一公司 · 工作流优化</p>
      </div>
    </div>

    <div class="consulting-content">
      <!-- Service Packages -->
      <section class="packages-section">
        <h2 class="section-title">服务套餐</h2>
        <div class="packages-grid">
          <div
            v-for="pkg in packages"
            :key="pkg.name"
            :class="['package-card', { highlighted: pkg.highlighted }]"
          >
            <div class="package-badge" v-if="pkg.highlighted">
              <el-icon><Star /></el-icon>
              <span>最受欢迎</span>
            </div>
            <h3 class="package-name">{{ pkg.name }}</h3>
            <div class="package-price">
              <span class="price-currency" v-if="pkg.price !== '免费'">¥</span>
              <span class="price-value">{{ pkg.price }}</span>
              <span class="price-unit" v-if="pkg.price !== '免费'">/次</span>
            </div>
            <p class="package-duration">
              <el-icon><Calendar /></el-icon>
              {{ pkg.duration }}
            </p>
            <p class="package-description">{{ pkg.description }}</p>
            <ul class="package-features">
              <li v-for="feature in pkg.features" :key="feature">
                <el-icon><Check /></el-icon>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Booking Form -->
      <section class="booking-section">
        <h2 class="section-title">预约咨询</h2>

        <el-card class="booking-card" v-if="!submitSuccess">
          <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-position="top"
            size="large"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="你的名字" />
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="your@email.com" />
            </el-form-item>

            <el-form-item label="公司/项目（选填）">
              <el-input v-model="formData.company" placeholder="个人或公司名称" />
            </el-form-item>

            <el-form-item label="咨询服务类型" prop="serviceType">
              <el-select v-model="formData.serviceType" placeholder="请选择服务类型" class="full-width">
                <el-option
                  v-for="option in serviceOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="预算范围（选填）">
              <el-select v-model="formData.budget" placeholder="请选择预算" class="full-width">
                <el-option
                  v-for="option in budgetOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="想要解决的问题">
              <el-input
                v-model="formData.message"
                type="textarea"
                :rows="4"
                placeholder="请描述你遇到的问题或想要达成的目标..."
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="isSubmitting"
                @click="submitForm"
                class="submit-button"
              >
                <el-icon v-if="!isSubmitting"><Message /></el-icon>
                {{ isSubmitting ? '提交中...' : '提交预约' }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="success-card" v-else>
          <div class="success-content">
            <el-icon class="success-icon"><Check /></el-icon>
            <h3>预约提交成功！</h3>
            <p>我会在 24 小时内通过邮箱与你联系，请注意查收。</p>
            <el-button @click="resetForm">再次预约</el-button>
          </div>
        </el-card>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <h2 class="section-title">常见问题</h2>
        <div class="faq-list">
          <div class="faq-item" v-for="faq in faqs" :key="faq.question">
            <h3 class="faq-question">
              <el-icon><ArrowRight /></el-icon>
              {{ faq.question }}
            </h3>
            <p class="faq-answer">{{ faq.answer }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.consulting-view {
  padding-bottom: 80px;
}

.consulting-hero {
  padding: 60px 20px 40px;
  text-align: center;
  background: var(--pk-ambient-1);
  border-bottom: 1px solid var(--pk-border-color);
  margin-bottom: 60px;

  .page-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 16px;
    letter-spacing: -0.04em;
  }

  .page-subtitle {
    font-size: 1.2rem;
    color: var(--pk-color-text-secondary);
    margin: 0;
  }
}

.consulting-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: var(--pk-color-text-primary);
  letter-spacing: -0.02em;
}

/* Packages Section */
.packages-section {
  margin-bottom: 80px;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.package-card {
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-lg);
  padding: 28px;
  background: var(--pk-color-bg-card);
  position: relative;
  transition: var(--transition-smooth);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -12px var(--pk-shadow-soft);
  }

  &.highlighted {
    border-color: var(--pk-color-primary);
    background: linear-gradient(
      135deg,
      var(--pk-ambient-1) 0%,
      var(--pk-ambient-2) 100%
    );

    .package-price .price-value {
      color: var(--pk-color-primary);
    }
  }

  .package-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 16px;
    background: var(--pk-color-primary);
    color: white;
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .package-name {
    font-size: 1.2rem;
    font-weight: 800;
    margin: 0 0 16px;
    color: var(--pk-color-text-primary);
  }

  .package-price {
    margin-bottom: 8px;

    .price-currency {
      font-size: 1.2rem;
      color: var(--pk-color-text-secondary);
    }

    .price-value {
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--pk-color-text-primary);
      letter-spacing: -0.02em;
    }

    .price-unit {
      font-size: 0.9rem;
      color: var(--pk-color-text-secondary);
    }
  }

  .package-duration {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--pk-color-text-secondary);
    font-size: 0.9rem;
    margin: 0 0 12px;

    .el-icon {
      font-size: 14px;
    }
  }

  .package-description {
    color: var(--pk-color-text-secondary);
    font-size: 0.9rem;
    margin: 0 0 20px;
    line-height: 1.5;
  }

  .package-features {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      color: var(--pk-color-text-secondary);
      font-size: 0.9rem;

      .el-icon {
        color: var(--pk-color-primary);
        font-size: 14px;
      }
    }
  }
}

/* Booking Section */
.booking-section {
  margin-bottom: 80px;
}

.booking-card {
  max-width: 600px;
  margin: 0 auto;

  :deep(.el-card__body) {
    padding: 32px;
  }

  .full-width {
    width: 100%;
  }

  .submit-button {
    width: 100%;
    margin-top: 8px;
    font-weight: 600;
  }
}

.success-card {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  :deep(.el-card__body) {
    padding: 48px 32px;
  }

  .success-content {
    .success-icon {
      font-size: 48px;
      color: var(--el-color-success);
      margin-bottom: 16px;
    }

    h3 {
      font-size: 1.5rem;
      margin: 0 0 12px;
      color: var(--pk-color-text-primary);
    }

    p {
      color: var(--pk-color-text-secondary);
      margin: 0 0 24px;
    }
  }
}

/* FAQ Section */
.faq-section {
  margin-bottom: 40px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.faq-item {
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  background: var(--pk-color-bg-card);
  transition: var(--transition-smooth);

  &:hover {
    border-color: var(--pk-color-primary);
  }

  .faq-question {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 12px;
    color: var(--pk-color-text-primary);

    .el-icon {
      color: var(--pk-color-primary);
      font-size: 16px;
    }
  }

  .faq-answer {
    color: var(--pk-color-text-secondary);
    margin: 0;
    line-height: 1.7;
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .consulting-hero {
    padding: 40px 20px 32px;

    .page-title {
      font-size: 2.2rem;
    }

    .page-subtitle {
      font-size: 1rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .package-card {
    padding: 24px;
  }

  .booking-card :deep(.el-card__body) {
    padding: 20px;
  }
}
</style>
