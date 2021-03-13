import server from '../services/api'

class Errors {
    sendPostErrorToApi(methodName, errorMessage){
        server.post(url.ERRORS_URL, { method: methodName, error: errorMessage })
        .then(result => result && console.log(result))
        .catch(result => console.log(result))
    }
}

export default new Errors();