import { ConfigProvider } from 'ant-design-vue'

export const themes = {
  ant: {
    name: 'AntD',
    prefixCls: 'ant',
  },
  galaxy: {
    name: 'Galaxy',
    prefixCls: 'galaxy',
  },
}
export default function configTheme(theme: any) {
  ConfigProvider.config((themes as any)[theme])
}
