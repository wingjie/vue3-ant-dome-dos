import { assign } from '@/common/utils/traverseTree'
import linkageHook, {
  configType,
  otherConfigType,
  pipelineType,
} from '@/common/hook/linkageHook'
import { getDictStore } from '@/common/utils/globalStore'

export default function modal(
  config: configType[] | undefined = [],
  pipeline?: pipelineType[] | undefined,
  otherConfig?: otherConfigType
) {
  // const $store = useStore()
  const oneOption = ref([])
  const linkageList = reactive([
    {
      label: '厂商',
      key: 'vendor',
      type: 'select',
      config: {
        async options() {
          const options = await getDictStore(getDictStore.Auto2_Vendor)
          return options?.menuItems
        },
      },
    },
    {
      label: '软件平台',
      key: 'softwarePlatform',
      type: 'select',
    },
    {
      label: '软件版本',
      key: 'softwareVersion',
      type: 'select',
    },
  ])
  const assignLinkageList = computed(() =>
    assign([], toRaw(linkageList), config)
  )
  const [fieldList, options] = linkageHook(assignLinkageList.value, [
    {
      change(a) {
        pipeline?.[0]?.change?.(a)
        otherConfig?.change?.(a)
      },
    },
    {
      change(a) {
        pipeline?.[1]?.change?.(a)
        otherConfig?.change?.(a)
      },
    },
    {
      change(a) {
        pipeline?.[2]?.change?.(a)
        otherConfig?.change?.(a)
      },
    },
  ])
  watch(
    () => oneOption.value,
    (val) => {
      options[0] = val
    },
    {
      immediate: true,
    }
  )
  const lastOptions = readonly(options)

  return reactive([[fieldList[0], fieldList[1], fieldList[2]], lastOptions])
}
