import JSZip from "jszip";
import FileSaver from "file-saver";

//获取文件blob
function getImgArrayBuffer(url){
    return new Promise((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest();
        const imgUrl = "http://0.0.0.0:8761/api/api" + url.substring(30)
        xmlhttp.open("GET", imgUrl, true);
        xmlhttp.responseType = "blob";
        // xmlhttp.setAttribute("crossOrigin", "anonymous");
        // console.log(xmlhttp)
        xmlhttp.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(this.status);
            }
        };
        xmlhttp.send();
    });
}

export function filesToRar(method, imageInfo) {
    let filename = new Date();
    let month =filename.getMonth() < 9 ? "0" + (filename.getMonth() + 1) : filename.getMonth() + 1;
    let date = filename.getDate() <= 9 ? "0" + filename.getDate() : filename.getDate();
    filename = filename.getFullYear() + month + date + filename.getHours() + filename.getMinutes() + filename.getSeconds();

    let arrImages = []
    let downImgTime = 0
    let zip = new JSZip();
    let cache = {};
    let promises = [];

    switch (method) {
        case "All":
            for(let i of imageData.urlList){
                for(let j = 0; j < i.imgList.length; j++){
                    arrImages.push({fileUrl: i['imgList'][j], renameFileName: i.name + "_" + (j + 1).toString() + ".jpg"})
                }
            }
            break;
        case "Select":
            for(let i in imageInfo){
                for(let j = 0; j < imageInfo[i].imageUrls.length; j++){
                    arrImages.push({fileUrl: imageInfo[i]['imageUrls'][j], renameFileName: i + "_" + (j + 1).toString() + ".jpg"})
                }
            }
            break;
    }

    if (arrImages.length == 0){
        this.$notify.info({
            title: '下载提示',
            message: '请选择图片进行下载!'
        });
        return "end";
    }
    var setIme = setInterval(() => {
        downImgTime++;
    }, 1000);

    for (let item of arrImages) {
        const promise = getImgArrayBuffer(item.fileUrl).then(data => {
            // 下载文件, 并存成ArrayBuffer对象(blob)
            zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
            cache[item.renameFileName] = data;
        });
        promises.push(promise);
    }
    Promise.all(promises)
        .then(() => {
            zip.generateAsync({ type: "blob" }).then(content => {
                // 生成二进制流
                FileSaver.saveAs(content, filename); // 利用file-saver保存文件  自定义文件名
                this.$notify.close();
                this.$notify({
                    title: '成功',
                    message: '下载成功',
                    type: 'success'
                });
                window.clearInterval(setIme);
                return "end"
            });
        })
        .catch(res => {
            this.$notify.error({
                title: '错误',
                message: '下载失败'
            });
            return "end"
        });
}