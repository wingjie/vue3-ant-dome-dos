import { assign } from '@/common/utils/traverseTree'
import {
  configType,
  pipelineType,
  otherConfigType,
} from '@/common/hook/linkageHook'
import $store from '@/store'
import { sceneDict } from '@/hook/FieldConfig'

export default function modal(
  config: configType[] | undefined = [],
  pipeline?: pipelineType[] | undefined,
  otherConfig?: otherConfigType
) {
  // const $store = useStore()
  const scenesOptions = ref<any>([])
  const sceneTagsOptionsData = ref([])
  const sceneTagsOptions = ref([])
  async function loadScene() {
    await Promise.all([
      $store.dispatch('scene/loadScene'),
      $store.dispatch('scene/loadTags'),
    ]).then(([sceneData, tagsData]) => {
      scenesOptions.value = sceneData.map((item: any) => {
        item.label = item.name
        item.value = item.id
        return item
      })
      sceneTagsOptionsData.value = sceneData.map((item: any) => {
        item.options = tagsData
          .filter((t: any) => t.sceneId === item.id)
          .map((s: any) => {
            s.label = s.name
            s.value = s.id
            return s
          })
        return item
      })
      sceneTagsOptions.value = sceneTagsOptionsData.value
    })
  }
  loadScene()
  const linkageList = reactive([
    {
      label: '场景',
      key: 'sceneId',
      type: 'select',
      config: {
        options: sceneDict,
        change(data: any) {
          // const val = data.value
          const { record } = data
          // if (!val) {
          //   sceneTagsOptions.value = sceneTagsOptionsData.value
          // } else {
          //   sceneTagsOptions.value = sceneTagsOptionsData.value.filter(
          //     (item: any) => item.value === val
          //   )
          // }
          const [, { key: twoKey }] = linkageList
          record[twoKey] = undefined
          pipeline?.[0]?.change?.(data)
          otherConfig?.change?.(data)
        },
      },
    },
    {
      label: '标签',
      key: 'sceneTags',
      type: 'select',
      config: {
        mode: 'multiple',
        'max-tag-count': 1,
        // options: computed(() => sceneTagsOptions.value),
        options(data: any) {
          const { sceneId } = data
          if (!sceneId) {
            sceneTagsOptions.value = sceneTagsOptionsData.value
          } else {
            sceneTagsOptions.value = sceneTagsOptionsData.value.filter(
              (item: any) => item.value === sceneId
            )
          }
          return sceneTagsOptions.value
        },
        change(data: any) {
          pipeline?.[1]?.change?.(data)
          otherConfig?.change?.(data)
        },
      },
    },
  ])
  const assignLinkageList = computed(() =>
    assign([], toRaw(linkageList), config)
  )
  return [assignLinkageList.value[0], assignLinkageList.value[1]]
}
