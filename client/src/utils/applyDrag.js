const applyDrag = (arr, payloadData) => {
    const { removedIndex, payload, addedIndex } = payloadData
    const result = [...arr]
    if (removedIndex !== null) {
        result.splice(removedIndex, 1)
    }
    if (addedIndex !== null) {
        result.splice(addedIndex, 0, payload)
    }
    return result
}  

export default applyDrag