import myFetch from "./myFetch.js";

const baseUrl = 'http://localhost:3000/api/v1'

/*
* 用户登录
* */
export const login = async (username, password) => {
    const body = {username,password};
    const init = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    return await myFetch(`${baseUrl}/auth/token`, init,false);
}

/*
* 用户注册
* */
export const register = async (username, password) => {
    const body = {username,password,email:username+'@shopee.com',
        avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUR8OZPKG9M0T7HlM61vqLz6reylOlJXrTog&s'};
    const init = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    return await myFetch(`${baseUrl}/join`, init,false);
}

/*
* 请求活动列表数据
* */
export const fetchEvents = async (offset, limit = 10, channelId = '', after = null, before = null) => {

    let url = `/events?offset=${offset}&limit=${limit}`;

    if (channelId) {
        url += `&channels=${channelId}`;
    }

    if (after!==null && before!==null) {
        url += `&after=${after}&before=${before}`;
    }

    const init = {
        method: 'GET',
    };
    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 请求所有活动频道
* */
export const fetchChannels = async () => {

    const url = '/channels';

    const init = {
        method: 'GET',
    };
    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 参与或者取消参与
* */
export const changeGoingStatus = async (eventId, isGoing) => {

    const url = `/events/${eventId}/participants`;

    const init = {
        method: isGoing ? 'DELETE' : 'POST',
        headers:{}
    };
    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 喜欢或者取消喜欢
* */
export const changeLikeStatus = async (eventId, isLike) => {

    const url = `/events/${eventId}/likes`;

    const init = {
        method: isLike ? 'DELETE' : 'POST',
        headers:{}
    };
    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 获得单个活动参与人
* */
export const fetchEventParticipants = async (eventId) => {

    const url = `/events/${eventId}/participants`;

    const init = {
        method: 'GET',
    };

    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 获得单个活动点赞人
* */
export const fetchEventLikes = async (eventId) => {

    const url = `/events/${eventId}/likes`;

    const init = {
        method: 'GET',
    };

    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 获得单个活动评论
* */
export const fetchEventComments = async (eventId) => {

    const url = `/events/${eventId}/comments`;

    const init = {
        method: 'GET',
    };

    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 用户发送评论
* */
export const postCommentToEvent = async (eventId, comment) => {

    const url = `/events/${eventId}/comments`;
    const body = {comment:comment};
    const init = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 获得用户详细信息
* */
export const fetchUserDetail = async () => {

    const url = "/user";

    const init = {
        method: 'GET',
    };
    return await myFetch(`${baseUrl}${url}`, init);
}

/*
* 获得用户活动列表
* */
export const fetchUserEvents = async (type) => {

    const url = `/user/events?type=${type}`;

    const init = {
        method: 'GET',
    };
    return await myFetch(`${baseUrl}${url}`, init);
}