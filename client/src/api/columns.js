import axios from "axios"
import url from '../utils/url.constant'

const createNewColumn = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const res =  await axios({
                method: 'post',
                url: url.createNewColumn,
                data: {
                    ...data
                }
            })
            const resData = res.data;
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData.data)
        } catch (error) {
            reject(error)
        }
    })
}

const updateColumn = (reqData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { id, ...data } = reqData
            const res =  await axios({
                method: 'put',
                url: `${url.updateColumn}/${id}`,
                data: {
                    ...data
                }
            })
            const resData = res.data;
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData.data)
        } catch (error) {
            reject(error)
        }
    })
}

export const columns = {
    createNewColumn,
    updateColumn
}