import { assign } from '@/common/utils/traverseTree'
import linkageHook, {
  configType,
  pipelineType,
  otherConfigType,
  // returnType,
} from '@/common/hook/linkageHook'

export default function modal(
  config: configType[] | undefined = [],
  pipeline?: pipelineType[] | undefined,
  otherConfig?: otherConfigType
) {
  const linkageList = reactive([
    {
      title: '一级',
      label: '',
    },
    {
      title: '二级',
      label: '',
    },
    {
      title: '三级',
      label: '',
    },
    {
      title: '四级',
      label: '',
    },
    {
      title: '五级',
      label: '',
    },
  ])
  const assignLinkageList = computed(() =>
    assign([], toRaw(linkageList), config)
  )
  const [fieldList, options] = linkageHook(
    assignLinkageList.value,
    pipeline,
    otherConfig
  )
  const lastOptions = readonly(options)

  const resolve = reactive([fieldList, lastOptions])
  return resolve
}
