import Axios from 'axios';
import url from "../config/urls"

const server = Axios.create({
    baseURL : url.BASE_URL,
    headers : {
        get : {
            origin : '*',
            xRequestedWith : '*'
        }
    }
})

export default server;