import server from '../services/api'
import url from '../config/urls'
class Errors {
    sendPostErrorToApi(methodName, errorMessage, title = null) {
        if (typeof errorMessage == 'object')
            errorMessage = errorMessage.toString()
        console.log('send error : ' + errorMessage)
        server
            .post(url.ERRORS_URL, {
                method: methodName,
                error: errorMessage,
                title,
            })
            .then((result) => result && console.log(result))
            .catch((result) => console.log(result))
    }
}

export default new Errors()
