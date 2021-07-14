import Axios from 'axios'
import Config from '../constants'

export default Axios.create({
    baseURL: Config.BASE,
})
