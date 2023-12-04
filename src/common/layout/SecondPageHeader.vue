<template>
  <div>
    <div class="details-page-header">
      <span>
        <slot name="icon">
          <i-ant-design-arrow-left-outlined
            v-if="icon"
            @click="resetPage"
            style="vertical-align: sub; cursor: pointer"
          />
        </slot>
        <span>{{ title }}</span>
      </span>
      <div class="right">
        <a-space>
          <slot name="default"> </slot>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface propMsg {
  title: string
  icon?: boolean
  back?: string
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {
  title: '',
  icon: true,
  back: '/',
})
const { title, icon, back } = toRefs(props)
const $route = useRoute()
const $router = useRouter()
const resetPage = () => {
  if ($route.query.formUrl) {
    $router.push($route.query.formUrl as string)
  } else {
    $router.push(back.value)
  }
}
</script>

<style scoped lang="scss">
.details-page-header {
  position: relative;
  padding: 20px 10px;
  color: #333;
  font-size: 18px;
  border-bottom: 1px solid #19c1de;
  margin-bottom: 10px;
}
.right {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
</style>
