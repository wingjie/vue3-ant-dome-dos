// eslint-disable-next-line import/no-extraneous-dependencies
import { h, defineComponent, resolveComponent, toRefs } from 'vue'

export default defineComponent({
  props: ['tag'],
  setup(data: any, { slots }: { slots: any }) {
    // const ButtonCounter = resolveComponent(`a-${field.type}`)
    // 返回渲染函数
    const { tag } = toRefs(data)
    return () =>
      h(
        resolveComponent(tag.value),
        {
          // ...attrs,
          // onChange: function(value: any) {
          //   emit('change', value)
          // },
          // onInput: function(value: any){
          //   emit('input', value)
          // },
          // onDropdownVisibleChange: function(value: any) {
          //   emit('dropdownVisibleChange', value)
          // },
          // ['inRemoveTag']: function(value: any) {emit('remove-tag', value)},
          // clear: function() { emit('clear')},
          // blur: function(ev) { emit('blur', ev)},
          // focus: function(ev) { emit('focus', ev)},
          // innerHTML: formItem
        },
        slots
      )
  },
})
