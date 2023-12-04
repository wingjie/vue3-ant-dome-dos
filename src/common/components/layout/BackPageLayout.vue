<template>
  <div class="back-page-layout" ref="backPageLayout">
    <a-affix :target="() => backPageLayout" v-show="isShowHeader">
      <div class="details-page-header">
        <div class="left">
          <a-button class="back-btn" @click="resetPage">
            <template #icon>
              <SvgIcon name="pure-return" class="back-icon" />
            </template>
            返回
          </a-button>
          <h1 class="title">{{ title }}</h1>
        </div>
        <div class="right">
          <a-space>
            <slot name="headerRight"></slot>
          </a-space>
        </div>
      </div>
    </a-affix>
    <div class="content-area">
      <a-spin :spinning="loading">
        <slot name="content"></slot>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBaseRoute } from '@/common/hook/useBaseRoute'

interface backInt {
  isShowHeader?: boolean
  title?: string
  back?: string | object
  loading?: boolean
}

const $route = useRoute()
const $router = useRouter()
const getRoute = getBaseRoute()
const $baseRouter = getRoute.$router

const backPageLayout = ref()
const $props = withDefaults(defineProps<backInt>(), {
  isShowHeader: true,
  title: '查看',
  back: '/',
  loading: false,
})
const { title, back, isShowHeader, loading } = toRefs($props)

function resetPage() {
  if ($route.query.formUrl) {
    $router.push($route.query.formUrl as string)
  } else if (back.value) {
    $router.push(back.value)
  } else {
    $baseRouter.go(-1)
  }
}
</script>

<style scoped lang="scss">
@import 'src/common/style/global';
.back-page-layout {
  height: calc(100vh - $height-all-top);
  min-height: 500px;
  overflow-y: auto;
  .content-area {
    padding: $main-content-mp;
  }
  @include scrollStyle;
}
.details-page-header {
  display: flex;
  justify-content: space-between;
  color: #333;
  font-size: 18px;
  border-bottom: 1px solid #dbe6f1;
  padding: $main-content-mp $main-content-mp 12px $main-content-mp;
  background-color: $content-block-bg;
  .back-btn {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
  }
  .title {
    margin: 24px 0 0 0;
    font-size: 18px;
    line-height: 22px;
    color: #111b1e;
  }
  .back-icon {
    font-size: 20px;
  }
}
</style>
