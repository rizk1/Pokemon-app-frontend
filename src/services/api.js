import axios from 'axios'

const URL = `https://pokeapi.co/api/v2/`
const LocalURL = `http://localhost:3333/`

export const getListPokemon = async (params) => {
    const response =  await axios.get(`${URL}pokemon`, {params})

    return response.data
}

export const getDetailPokemon = async (name) => {
    const response =  await axios.get(`${URL}pokemon/${name}`)

    return response.data
}

export const listCatchPokemon = async () => {
    const response =  await axios.get(`${LocalURL}my-pokemon`)

    return response.data
}

export const catchPokemon = async (params) => {
    const response =  await axios.post(`${LocalURL}catch-pokemon`, params)

    return response.data
}

export const changeNamePokemon = async (params) => {
    const response =  await axios.post(`${LocalURL}change-pokemon-name`, params)

    return response.data
}

export const detailCatchPokemon = async (pokemon) => {
    const response =  await axios.get(`${LocalURL}my-pokemon/${pokemon}`)

    return response.data
}

export const ReleasePokemon = async (pokemon) => {
    const response =  await axios.get(`${LocalURL}release-pokemon/`, {params: pokemon})

    return response.data
}