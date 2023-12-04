/* eslint-disable import/prefer-default-export */
import Icons from '@/common/components/Icons/index.vue'

interface IconConfig {
  /** 图标颜色 */
  color?: string
  /** 图标大小 */
  fontSize?: string
  style?: { [p: string]: string | number }
}

interface IconStyle {
  color?: string
  fontSize?: string
}
/**
 * 图标名称(iconify图标的名称)
 * - 例如：mdi-account 或者 mdi:account
 */
type iconType = string

/**
 * 图标渲染
 * @param config
 * @property icon - 图标名称(iconify图标的名称), 例如：mdi-account 或者 mdi:account
 * @property localIcon - 本地svg图标文件名(assets/svg文件夹下)
 * @property color - 图标颜色
 * @property fontSize - 图标大小
 */
export const iconRender = (icon: iconType, config?: IconConfig) => {
  const style: IconStyle = {
    fontSize: '16px',
  }

  if (config?.color) {
    style.color = config?.color
  }
  if (config?.fontSize) {
    style.fontSize = config.fontSize
  }

  if (!icon) {
    window.console.warn('没有传递图标名称，请确保给icon或localIcon传递有效值!')
  }

  return () =>
    h(Icons, { icon, ...config, style: { ...config?.style, ...style } })
}
