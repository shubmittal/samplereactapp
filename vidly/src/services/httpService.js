import axios from 'axios'
import {toast} from 'react-toastify'
import logService from './logService'




axios.interceptors.response.use(null, error => {
  if (!(error.response && error.response.status >= 400 && error.response.status < 500)) {
    logService.log(error)
    toast.error("Unexpected error")
  }
  return Promise.reject(error)
})

function setjwt(jwt)
{
  axios.defaults.headers.common["x-auth-token"]= jwt
}

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setjwt: setjwt
}