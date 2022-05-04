import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () =>
    axios
        .get(baseUrl)
        .then(response => response.data)

const save = blog => {
    const config = {
        headers: { Authorization: token }
    }

    return axios
        .post(baseUrl, blog, config)
        .then(response => response.data)
}

const update = blog => {
    const config = {
        headers: { Authorization: token }
    }

    return axios
        .put(`${baseUrl}/${blog.id}`, blog, config)
        .then(response => response.data)
}

const remove = id => {
    const config = {
        headers: { Authorization: token }
    }

    axios.delete(`${baseUrl}/${id}`, config)
}

const blogService = { getAll, save, update, remove, setToken }

export default blogService