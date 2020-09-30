let defaultToken = ''
try {
    if(localStorage.getItem('token')){
        defaultToken = localStorage.getItem('token')
    }
} catch (e) {}

// let defaultUsername = ''
// let defaultEmail = ''
// let defaultPhone = ''
// let defaultGrade = ''
// this.$http.get("/api/my/info").then(res => {
//     if (res.data.code == 1000){
//         defaultUsername = res.data.data.nikeName
//         defaultEmail = res.data.data.email
//         defaultPhone = res.data.data.phone
//         switch (res.data.data.grade) {
//             case "free":
//                 defaultGrade = "免费会员"
//                 break;
//             case "primary":
//                 defaultGrade = "免费会员"
//                 break;
//             case "middle":
//                 defaultGrade = "免费会员"
//                 break;
//             case "advanced":
//                 defaultGrade = "免费会员"
//                 break;
//         }
//     }
// })

export default {
    token: defaultToken,
    DEFAULT_NUM: '6862577',
    // searchForArticleno: '',
}