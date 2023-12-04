<template>
  <div class="boxs">
    <div class="box">
      使用简单，但是无法动态渲染，正能以这种标签的形式书写，才能被编译打包：
      <i-mdi-book-plus-multiple-outline />
    </div>
    <div class="box">
      这种方式简单，但是需要联网：
      <Icons :icon="icons" />
      <component :is="dynamic"></component>
    </div>
    <div>
      预设的图标：
      <Icon :name="icon" />
    </div>
  </div>
</template>
<script setup lang="ts">
// import Icons from '@/common/components/Icons'
import { iconRender } from '@/common/hook/icon'

console.log('aaaaa')

const icons = ref('material-symbols:bring-your-own-ip')
const icon = ref('ant-design:linkedin-outlined')

const dynamic = iconRender('material-symbols:card-membership-outline')
const $config = ref({
  title: '基础使用',
  context: `
  直接以标签名使用,注意是复制i-**-**的格式。
  引入组件@/common/components/Icons，工程中若是已经设置自动引入的插件，则直接使用即可。
  注意复制material-symbols:bring-your-own-ip这中冒号的格式。还可以利用封装好的hook,直接转为组件。
  `,
  contextType: 'pre',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
}
</style>
