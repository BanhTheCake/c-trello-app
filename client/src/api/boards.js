import axios from "axios"
import url from '../utils/url.constant'

const fetchBoardById = ({ queryKey }) => {
    const [_, boardId] = queryKey
    return new Promise( async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${url.getBoardById}/${boardId}`,
            })
            const resData = res.data
            if (resData.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const updateOne = (reqData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { id, ...data } = reqData
            const res = await axios({
                method: 'put',
                url: `${url.updateBoard}/${id}`,
                data: {
                    ...data
                }
            })
            const resData = res.data
            if (resData.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData.data)
        } catch (error) {
            reject(error)
        }
    })
}

export const boards = {
    fetchBoardById,
    updateOne
}