export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr
    const result = [...arr]
    let itemToAdd = payload
    console.log('itemToAdd1', itemToAdd)
    if (removedIndex !== null) {
      console.log('removendo', result[removedIndex])
      itemToAdd = result.splice(removedIndex, 1)[0]
    }
    console.log('itemToAdd2', itemToAdd)
    if (addedIndex !== null) {
      console.log('adicionando', result[addedIndex])
      result.splice(addedIndex, 0, itemToAdd)
    }
  
    return result
  }
