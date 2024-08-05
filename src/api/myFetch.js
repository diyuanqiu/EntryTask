async function myFetch(url,init){

    let result;

    let defaultInit = {
        headers:{
            'Content-Type':'application/json',
        },
        mode:'cors'
    }
    init = Object.assign(defaultInit,init) // 将 init 对象中的属性合并到 defInit 中，
    await fetch(url,init)
        .then(data => data.text()) // 将响应体读取为文本
        .then(res => {
            result = JSON.parse(res)  // 将文本解析为 JSON 对象
        }).catch(error => {
            console.log('error.message :>> ', error.message); // 如果错误,输出错误信息
        })

    return result;
}

export default myFetch;