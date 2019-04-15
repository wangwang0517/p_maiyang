export function getUrgentLevelFormatterClass (level) {
  switch (Number.parseInt(level)) {
    case 1 :
      return 'urgent-level-1'
    case 2 :
      return 'urgent-level-2'
    case 3 :
      return 'urgent-level-3'
    case 4 :
      return 'urgent-level-4'
    default:
      return ''
  }
}

export function getUrgentLevelFormatterHtml (level) {
  console.info(level)
  switch (Number.parseInt(level)) {
    case 1 :
      return '一级'
    case 2 :
      return '二级'
    case 3 :
      return '三级'
    case 4 :
      return '四级'
    default:
      return '其他'
  }
}

export function getAlarmStateFormatterClass (state) {
  if (Number.parseInt(state) === 1) {
    return 'state-info'
  } else {
    return 'state-danger'
  }
}

export function getAlarmStateFormatterHtml (state) {
  if (Number.parseInt(state) === 1) {
    return '已处理'
  } else {
    return '未处理'
  }
}
