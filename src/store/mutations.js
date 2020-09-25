export default {
    chageToken(state, token) {
        state.token = token
        try {
            localStorage.setItem('token',token)
        } catch (e) {}
    },
    clearToken(state) {
        localStorage.setItem('token', '')
        state.token = ''
    },
    updateImageData(state, imageData) {
        state.imageData = imageData
    },
    updateImageInfo(state, imageInfo) {
        state.imageInfo = imageInfo
    }
}