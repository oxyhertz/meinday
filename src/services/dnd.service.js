export const dndService = {
  applyDrag,
}

function applyDrag(arr, dragResult) {
  console.log(
    '🚀 ~ file: dnd.service.js:6 ~ applyDrag ~ dragResult',
    dragResult
  )
  const { removedIndex, addedIndex, payload } = dragResult

  if (removedIndex === null && addedIndex === null) return arr
  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }
  return result
}
