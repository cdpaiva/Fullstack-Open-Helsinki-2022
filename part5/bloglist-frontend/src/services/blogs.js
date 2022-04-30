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
    headers: {Authorization: token}
  }

  return axios
  .post(baseUrl, blog, config)
  .then(response => response.data)
}

const blogService = { getAll, save, setToken }

export default blogService