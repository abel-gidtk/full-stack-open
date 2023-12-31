import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const delNum = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

const update = (id, newObject) => {
    return axios.patch(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, delNum, update }