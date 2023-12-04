// eslint-disable-next-line import/prefer-default-export
export const columns = (data: any[]) => {
  return data.map((item) => {
    return {
      ...item,
      dataKey: item?.dataIndex,
    }
  })
}

// export default {}
