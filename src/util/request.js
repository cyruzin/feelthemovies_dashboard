import axios from "axios"
import { BASE_URL, AUTH_URL, TMDB_TOKEN } from "./constants"

// Default error messages for failing requests.
const errorMessages = {
  default: "Something went wrong",
  noResponse: "No response from the server",
  network: "Network error"
}

// This function handles three types of
// errors relationed to requests.
function errorHandler (error) {
  if (error.response) {
    /**
     * The server responded with a status code
     * that falls out of the range of 2xx.
     */
    throw error.response.data || errorMessages.default
  } else if (error.request) {
    /**
     * The request was made but no response was received.
     */
    throw error.request.response || errorMessages.noResponse
  } else {
    /**
     * Something went wrong in setting up the request.
     */
    throw error.message || errorMessages.network
  }
}

// Authentication instance.
// For authentication requests.
const feelTheMoviesAuth = axios.create({
  method: "POST",
  baseURL: AUTH_URL
})

export async function httpFetchAuthentication (credentials) {
  try {
    const response = await feelTheMoviesAuth({ data: credentials })
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}

// Common instance.
// For common requests.
const feelTheMovies = axios.create({
  baseURL: BASE_URL
})

feelTheMovies.interceptors.request.use(req => {
  const newReq = req

  const store = localStorage.getItem("state")
  const state = JSON.parse(store)

  const { token } = state.authentication.user

  newReq.headers.common["Authorization"] = `Bearer ${token}`

  return newReq
})

export async function httpFetch ({ url, method, data, params }): Promise<any> {
  try {
    const response = await feelTheMovies({ url, method, data, params })
    return response.data
  } catch (error) {
    errorHandler(error)
  }
}

// TMDb instance.
// For TMDb requests.
const tmdb = axios.create({
  method: "GET",
  baseURL: "https://api.themoviedb.org/3"
})

tmdb.interceptors.request.use(req => {
  const newReq = req
  newReq.params = {
    api_key: TMDB_TOKEN
  }
  return newReq
})

export async function httpFetchTMDb ({ url }) {
  try {
    const response = await tmdb({ url })
    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data.status_message || errorMessages.default
    } else if (error.request) {
      throw error.request.response || errorMessages.noResponse
    } else {
      throw error.message || errorMessages.network
    }
  }
}
