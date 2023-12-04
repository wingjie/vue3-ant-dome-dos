import { insertCss } from 'insert-css'
// 这里协助演示的代码，在实际项目中根据实际情况进行调整

const installCss = (css?: string | undefined): void => {
  insertCss(
    css ??
      `
    #container {
      display: flex;
      border: 1px solid #dfe3e8;
    }
    #stencil {
      width: 180px;
      height: 100%;
      position: relative;
      border-right: 1px solid #dfe3e8;
    }
    #container {
      width: calc(100%);
      height: 100%;
    }
    .x6-widget-stencil  {
      background-color: #fff;
    }
    .x6-widget-stencil-title {
      background-color: #fff;
    }
    .x6-widget-stencil-group-title {
      background-color: #fff !important;
    }
    .x6-widget-transform {
      margin: -1px 0 0 -1px;
      padding: 0px;
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div {
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div:hover {
      background-color: #3dafe4;
    }
    .x6-widget-transform-active-handle {
      background-color: #3dafe4;
    }
    .x6-widget-transform-resize {
      border-radius: 0;
    }
    .x6-widget-selection-inner {
      border: 1px solid #239edd;
    }
    .x6-widget-selection-box {
      opacity: 1;
    }
    .x6-edge:hover path:nth-child(2) {
      stroke: #1890ff;
    }
    
    .x6-edge-selected path:nth-child(2) {
      stroke: orange;
      stroke-width: 2;
      stroke-dasharray: 5;
      target-marker: 'classic';
      animation: ant-line 30s infinite linear;
    }
    @keyframes ant-line {
      to {
        stroke-dashoffset: -1000;
      }
    }
  `
  )
}
export default installCss
// .x6-node-selected rect {
//   stroke: orange;
//   stroke-width:2;
// }
// .x6-node:hover rect {
//   stroke: #1890ff;
//   stroke-width:2;
// }
