<template>
  <div class="login">
    <div class="logo">
      <img :src="logoImg" alt="" />
      <!-- <span>南天云</span> -->
    </div>
    <div class="login-banner">
      <img :src="bannerImg" alt="banner" />
    </div>
    <div class="login-form">
      <div class="login-area">
        <div class="logo-item">
          <img :src="loginItem" alt="loginItem" />
        </div>
        <h4 class="login-title">登 录</h4>
        <h5 class="login-welcome">欢迎使用DNet平台</h5>
        <a-form
          label-align="right"
          :model="loginForm"
          :rules="loginRules"
          :label-col="{ span: 5 }"
          @finish="login"
          class="login-form-main"
        >
          <a-form-item name="username" class="int-item">
            <a-input
              class="l-input"
              v-model:value="loginForm.username"
              placeholder="用户名"
            >
              <template #prefix>
                <SvgIcon name="icon-username" class="int-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" class="int-item">
            <a-input-password
              class="l-input"
              v-model:value="loginForm.password"
              placeholder="密码"
            >
              <template #prefix>
                <SvgIcon name="icon-password" class="int-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="code" class="int-item">
            <a-input-group class="code-area" compact placeholder="验证码">
              <a-input
                v-model:value="loginForm.code"
                class="l-input"
                placeholder="验证码"
              >
                <template #prefix>
                  <SvgIcon name="icon-verify" class="int-icon" />
                </template>
              </a-input>
              <a-spin :spinning="authCodeSpin">
                <div class="code-img-area">
                  <img
                    class="auth-code-img"
                    :src="authCodeSrc"
                    alt="验证码"
                    @click="updateAuthCode"
                  />
                </div>
              </a-spin>
            </a-input-group>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              :loading="loading"
              class="login-button"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
        <div class="copyright">
          Copyright &copy; 2023 南天电子信息产业股份有限公司
        </div>
      </div>
    </div>
    <BgCanvas></BgCanvas>
  </div>
</template>

<script setup lang="ts">
import logoImg from '@/common/assets/logo.png'
import bannerImg from '@/common/assets/login-banner.png'
import loginItem from '@/common/assets/login-item.png'
import { getLoginImgCode } from '@/common/http/api/login'
import BgCanvas from './BgCanvas.vue'

const $store = useStore()
const $router = useRouter()

const authCodeSrc = ref('')
const loginForm: any = reactive({
  username: '',
  password: '',
  code: '',
  captchaId: '',
})
const loginRules = reactive({
  username: [{ required: true, message: '请输入账号名' }],
  password: [{ required: true, message: '请输入密码' }],
  code: [{ required: true, message: '请输入验证码' }],
})
const loading = ref(false)
const authCodeSpin = ref(false)

onMounted(() => {
  updateAuthCode()
})

function login(formData: any) {
  loading.value = true
  const submitData = {
    user: formData.username,
    password: formData.password,
    inputCaptchaCode: formData.code,
    captchaId: loginForm.captchaId,
  }
  $store
    .dispatch('user/login', submitData)
    .then(() => {
      $router.push({ name: 'Home' })
    })
    .catch(() => {
      updateAuthCode()
    })
    .finally(() => {
      loginForm.code = ''
      loading.value = false
    })
}
function loadAuthCode() {
  authCodeSpin.value = true
  getLoginImgCode()
    .then((resp: any) => {
      const { image, id } = resp
      loginForm.captchaId = id
      authCodeSrc.value = `data:image/jpg;base64,${image}`
    })
    .finally(() => {
      authCodeSpin.value = false
    })
}
function updateAuthCode() {
  loadAuthCode()
}
</script>

<style scoped lang="scss">
@import './login.scss';
.galaxy-theme-style {
  @import './login.scss';
}
</style>
<style lang="scss">
.int-item {
  div[class*='form-item-control'] {
    position: relative;
  }
  div[class*='form-item-explain'] {
    position: absolute;
    width: 100%;
    top: 27px;
  }
  div[class*='form-item-explain-error'] {
    color: #ff8080;
    font-size: 12px;
  }
}
</style>
