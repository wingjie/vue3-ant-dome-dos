type eventType =
  | 'click'
  | 'dblclick'
  | 'contextmenu'
  | 'mousedown'
  | 'mousemove'
  | 'mouseup'
  | 'mousewheel'
  | 'mouseenter'
  | 'mouseleave'
type eventPerson = 'cell' | 'node' | 'edge' | 'blank'
export type eventConfigType = {
  // 事件配置格式接口
  [prop in eventPerson]?: {
    [innerProp in eventType]?: () => void
  }
}
export const installCutKey = (graph: any) => {
  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.cut(cells)
    }
    return false
  })
  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })

  // undo redo
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.history.canUndo()) {
      graph.history.undo()
    }
    return false
  })
  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.history.canRedo()) {
      graph.history.redo()
    }
    return false
  })

  // select all
  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes()
    if (nodes) {
      graph.select(nodes)
    }
  })

  // delete
  graph.bindKey('backspace', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })

  // zoom
  graph.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.zoom()
    if (zoom < 1.5) {
      graph.zoom(0.1)
    }
  })
  graph.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.zoom()
    if (zoom > 0.5) {
      graph.zoom(-0.1)
    }
  })
}
// 控制连接桩显示/隐藏
export const showPorts = (ports: any, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

// 将对象配置转换格式，供x6使用
function flatEvent(eventConfig?: eventConfigType) {
  const objName: any = {}
  if (eventConfig) {
    for (const [person, personVal] of Object.entries(eventConfig)) {
      for (const [type, fn] of Object.entries(personVal as object)) {
        const name = `${person}:${type}`
        objName[name] = fn
      }
    }
  }
  return objName
}
// 单独的事件逻辑可以在此进行配置
const crossConfig: any = {
  cell: {},
  node: {
    mouseenter() {
      const container = document.getElementById('container')!
      const ports = container.querySelectorAll('.x6-port-body')
      showPorts(ports, true)
    },
    mouseleave(): void {
      const container = document.getElementById('container')!
      const ports = container.querySelectorAll('.x6-port-body')
      showPorts(ports, false)
    },
  },
  blank: {
    click() {},
  },
}
const getEventMsg = (e: any) => {
  return {
    id: e.cell.id,
    data: e.cell.data,
    attrs: e.cell.attrs,
  }
}
// 将本文件的方法中的逻辑与向外暴漏的组件中的方法中的逻辑合并的方法
export const bindEvent = (graph: any, eventConfig?: eventConfigType) => {
  const eventConfigFlat = flatEvent(eventConfig)
  const crossConfigFlat = flatEvent(crossConfig)
  const flatArr: string[] = [
    ...new Set([
      ...Object.keys(eventConfigFlat),
      ...Object.keys(crossConfigFlat),
    ]),
  ]
  flatArr.forEach((key) => {
    graph.on(key, (event: { node: any }) => {
      const { node } = event
      if (node?.data?.EVENTAPPOINT && node.data.EVENTKEY.includes(key)) {
        node.setData({
          EVENTAPPOINT: (type: string) => {
            if (crossConfigFlat[key]) crossConfigFlat[key](graph, event)
            if (eventConfigFlat[key])
              eventConfigFlat[key](event, getEventMsg(event), type)
          },
        })
      } else {
        if (crossConfigFlat[key]) crossConfigFlat[key](graph, event)
        if (eventConfigFlat[key])
          eventConfigFlat[key](event, getEventMsg(event))
      }
    })
  })
}
