// @ts-ignore
const eventCenter = window['venus-faraEventCenter']

function isMicroApp() {
  return !!eventCenter
}

function addEventCenter(callback: Function) {
  if (eventCenter) {
    eventCenter.clearDataListener()
    eventCenter.addDataListener((data: any) => callback(data))
  }
}

function setDataToBaseApp(data: any) {
  if (eventCenter) {
    eventCenter.dispatch(data)
  }
}

export { isMicroApp, addEventCenter, setDataToBaseApp }
