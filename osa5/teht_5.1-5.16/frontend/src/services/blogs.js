import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  try {
    const header = {
      headers: { 'Authorization': token }
    }
  
    const response = await axios.post(baseUrl, newObject, header)
    return response.data
  }
  catch (exception) {
  console.log(exception)
  }
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (blog) => {
  const header = {
    headers: { 'Authorization': token }
  }
  const id = blog._id
  const response = await axios.delete(`${baseUrl}/${id}`, header)
  return response.data
}

export default { getAll, create, update, setToken, remove }