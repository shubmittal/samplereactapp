import axios from 'axios'
import {toast} from 'react-toastify'

axios.interceptors.response.use(null, error => {
    if (!(error.response && error.response.status > 400 &&  error.response.status < 500))
    {
      console.log("An unexpected error")
      toast.error("Unexpected error")
    }
    return Promise.reject(error)
  })

  export default
  {
      get: axios.get,
      post: axios.post,
      delete: axios.delete,
      put: axios.put
  }