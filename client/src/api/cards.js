import axios from "axios"
import url from '../utils/url.constant'

const createNewCard = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const res =  await axios({
                method: 'post',
                url: url.createNewCards,
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

export const cards = {
    createNewCard
}