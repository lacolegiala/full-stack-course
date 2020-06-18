import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

const update = async (id, personObject) => {
  console.log(id, personObject, ' id and person')
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  const response = await request
  console.log(response.data, ' update response')
  return response.data
}


export default { 
  getAll,
  create,
  remove,
  update
}