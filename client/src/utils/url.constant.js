const urlBase = 'http://localhost:8017'
const version = 'v1'

// boards
const urlBoards = `${urlBase}/${version}/boards`
const getBoardById = `${urlBoards}/getBoardById`
const updateBoard = `${urlBoards}/updateOne`

// columns
const urlColumns = `${urlBase}/${version}/columns`
const createNewColumn = `${urlColumns}/createNewOne`
const updateColumn = `${urlColumns}/updateOne`

// cards
const urlCards = `${urlBase}/${version}/cards`
const createNewCards = `${urlCards}/createNewOne`

const url = {
    getBoardById,
    createNewColumn,
    createNewCards,
    updateColumn,
    updateBoard
}

export default url