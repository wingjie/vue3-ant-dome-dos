import { customRender as customRenders } from '@/common/utils/commonWay'
// eslint-disable-next-line import/prefer-default-export
export function customRender({ text: txt }: { text: string[] | string }): any {
  return customRenders({ text: txt })
}
