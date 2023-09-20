import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

export const healthCheck = async() =>{
  return await api.get('/health')
}

export const postProfile = async(data:FormData) =>{
  return await api.post('/profiles'), 
  {profile : data}
}

export const getStates = async() =>{
  const response = await api.get('/states')
  return response.data
}

export const getCities = async(id : string) =>{
  const response = await api.get(`/states/${id}/cities`)
  return response.data
}

export const getAbilities = async(role : string) =>{
  const response = await api.get(`abilities`,
  { params : {role}})
  return response.data
}

export const getTechs = async() =>{
  const response = await api.get('/techs')
  return response.data
}

export const getSoftskills = async() =>{
  const response = await api.get('/softskills')
  return response.data
}

export const getPDF = async (id:string) => {
  const response = await api.get(`/profiles/${id}/download`)
  return response.data
}

export const getProfile = async (id:string) => {
  const response = await api.get(`/profiles/${id}`)
  return response.data
}