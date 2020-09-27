let defaultToken = ''
try {
    if(localStorage.getItem('token')){
        defaultToken = localStorage.getItem('token')
    }
} catch (e) {}

export default {
    token: defaultToken,
    // imageInfo: {},
    // imageData: {
    //     name: 'nike',
    //     urlList: [],
    // },
    DEFAULT_NUM: '6862577',
    userImageInfo: {
        'CW0411-010': {
            checkAll: false,
            isIndeterminate: false,
            dialogVisible: false,
            dialogVisible2: false,
            imageUrls: [],
        },
        'AJ2876-100': {
            checkAll: false,
            isIndeterminate: false,
            dialogVisible: false,
            dialogVisible2: false,
            imageUrls: [],
        },
        'AT5939-407': {
            checkAll: false,
            isIndeterminate: false,
            dialogVisible: false,
            dialogVisible2: false,
            imageUrls: [],
        },
    },
    userImageData: {
        name: 'nike',
        urlList: [
            {
                name: 'CW0411-010',
                imgList:['https://images.nike.com/is/image/DotCom/CW0411_010_A_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/CW0411_010_B_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/CW0411_010_C_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/CW0411_010_D_PREM?wid=1800&hei=1800',],
            },
            {
                name: 'AJ2876-100',
                imgList:['https://images.nike.com/is/image/DotCom/AJ2876_100_A_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/AJ2876_100_B_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/AJ2876_100_C_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/AJ2876_100_D_PREM?wid=1800&hei=1800'],
            },
            {
                name:'AT5939-407',
                imgList: [
                    'https://images.nike.com/is/image/DotCom/AT5939_407_A_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/AT5939_407_B_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/AT5939_407_C_PREM?wid=1800&hei=1800',
                    'https://images.nike.com/is/image/DotCom/AT5939_407_D_PREM?wid=1800&hei=1800']
            }
        ],
    }
}