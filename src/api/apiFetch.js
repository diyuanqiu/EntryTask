import myFetch from "./myFetch.js";

const baseUrl = 'http://localhost:3000/api/v1'

/*
* 用户登录
* */
export const login = async (url, username, password) => {
    let body = {username,password}
    let init = {
        method: 'POST',
        body: JSON.stringify(body)
    }
    return await myFetch(`${baseUrl}${url}`, init)
}

/*
* 用户注册
* */
export const register = async (url, username, password, email, avatar) => {
    let body = {username,password,email:username+'@shopee.com',avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUR8OZPKG9M0T7HlM61vqLz6reylOlJXrTog&s'}
    let init = {
        method: 'POST',
        body: JSON.stringify(body)
    }
    return await myFetch(`${baseUrl}${url}`, init)
}

/*
* 请求活动列表数据
* */
export const fetchEvents = async (url, token) => {
    let init = {
        method: 'GET',
        headers: {
            'X-BLACKCAT-TOKEN' : token
        }
    }
    return await myFetch(`${baseUrl}${url}`, init)
}

/*
* 参与或者取消参与
* */
export const changeGoingStatus = async (url, token, isGoing) => {
    let init = {
        method: isGoing ? 'DELETE' : 'POST',
        headers: {
            'X-BLACKCAT-TOKEN' : token
        }
    }
    return await myFetch(`${baseUrl}${url}`, init)
}

/*
* 喜欢或者取消喜欢
* */
export const changeLikeStatus = async (url, token, isLike) => {
    let init = {
        method: isLike ? 'DELETE' : 'POST',
        headers: {
            'X-BLACKCAT-TOKEN' : token
        }
    }
    return await myFetch(`${baseUrl}${url}`, init)
}

/*
* 获得活动细节
* */
export const fetchEventsDetail = async (url, token) => {
    let init = {
        method: 'GET',
        headers: {
            'X-BLACKCAT-TOKEN' : token
        }
    }
    return await myFetch(`${baseUrl}${url}`, init)
}

/*
* 用户发送评论
* */
export const postCommentToEvent = async (url, token, comment) => {
    let body = {comment:comment}
    let init = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'X-BLACKCAT-TOKEN' : token,
            'Content-Type': 'application/json'
        }
    }
    return await myFetch(`${baseUrl}${url}`, init)
}

/*
* 获得用户详细信息
* */
export const fetchUserDetail = async (url, token) => {
    let init = {
        method: 'GET',
        headers: {
            'X-BLACKCAT-TOKEN' : token
        }
    }
    return await myFetch(`${baseUrl}${url}`, init)
}