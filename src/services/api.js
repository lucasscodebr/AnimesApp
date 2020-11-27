import Axios from 'axios';

const server = Axios.create({
    baseURL : 'http://localhost',
    headers : {
        get : {
            origin : '*',
            xRequestedWith : '*'
        }
    }
})

export default server;