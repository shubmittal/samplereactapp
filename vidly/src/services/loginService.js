import httpService from './httpService'
import config from "../config.json"
import jwtDecode from 'jwt-decode'



const loginApiEndpoint = `${config.apiEndpoint}/auth`;
const tokenKey = config.tokenKey;

httpService.setjwt(getjwt())

export async function login(credentials)
{
  let {data:jwt} = await httpService.post(loginApiEndpoint, credentials)
  localStorage.setItem(tokenKey, jwt)
}

export function logout ()
{
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser()
{
  try{
    let token = localStorage.getItem(tokenKey)
    return jwtDecode(token)
  }
  catch(ex)
  {
    return null
  }
}

  export function loginWithJWT (jwt)
  {
    localStorage.setItem(tokenKey,jwt)
  }

  export function getjwt()
  {
    return localStorage.getItem(tokenKey)
  }
  
