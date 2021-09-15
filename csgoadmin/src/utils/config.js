export const _URL = 'http://adm.pddmh.com/'

export const getLabel = (arr, val) => {
  const obj = arr.find(item => item.value === val)
  return obj.label
}

export const stat = [
  {
    label: '未上架',
    value: 0
  },
  {
    label: '上架',
    value: 1
  },
  {
    label: '下架',
    value: 2
  }
]

export const formData = (form) => {
  const data = new FormData()
  for (var key in form) {
    data.append(key, form[key])
  }
  return data
}

export const rollStatus = [
  {
    label: '开启',
    value: 1
  },
  {
    label: '关闭',
    value: 2
  },
  {
    label: '开奖',
    value: 3
  }
]
