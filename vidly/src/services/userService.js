import httpService from './httpService'
import config from "../config.json"


const userApiEndpoint = `${config.apiEndpoint}/users`;


export function registerUser(user) {
  return httpService.post(userApiEndpoint,user )
}