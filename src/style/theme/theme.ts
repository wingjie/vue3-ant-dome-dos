import { ConfigProvider } from 'ant-design-vue'

export const themes = {
  ant: {
    name: '风格一',
    prefixCls: 'ant',
  },
  'galaxy-ant': {
    name: '风格二',
    prefixCls: 'galaxy-ant',
    theme: {
      primaryColor: '#c82121',
    },
  },
}
export default function configTheme(theme: any) {
  ConfigProvider.config((themes as any)[theme])
}
