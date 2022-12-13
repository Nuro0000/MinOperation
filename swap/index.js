function mainOperation_swap(originList, targetList) {
  const operation = []
  const positionRecord = originList.slice()
  originList.forEach(item => {
    const tarIndex = targetList.indexOf(item)
    const nowIndex = positionRecord.indexOf(item)
    // position changed
    if(nowIndex !== tarIndex) {
      const placeholderElm = positionRecord[tarIndex]
      operation.push([item, placeholderElm]);
      // execuse swap
      [positionRecord[tarIndex], positionRecord[nowIndex]] = [positionRecord[nowIndex], positionRecord[tarIndex]]
      console.log('positionRecord:', positionRecord)
    }
  })
  return operation
}

const oldArr = [3,1,2,5,4,6,9,7,8]
const newArr = [1,2,3,4,5,6,7,8,9]

console.log(mainOperation_swap(oldArr, newArr))