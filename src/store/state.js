let defaultToken = ''
try {
    if(localStorage.getItem('token')){
        defaultToken = localStorage.getItem('token')
    }
} catch (e) {}

export default {
    token: defaultToken
}