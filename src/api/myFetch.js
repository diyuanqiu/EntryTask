async function myFetch(url,init,requireAuth = true){

    try {
        // 默认初始化配置
        const defaultInit = {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            ...init
        };

        // 检查用户是否登录
        if (requireAuth) {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/Login';
                return;
            }
            defaultInit.headers['X-BLACKCAT-TOKEN'] = token;
        }

        const response = await fetch(url, defaultInit);
        const text = await response.text();
        const result = text ? JSON.parse(text) : {}

        // 检查token是否过期
        if (result.error === 'invalid_token') {
            localStorage.removeItem('token');
            window.location.href = '/Login';
            return;
        }

        return result;

    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

export default myFetch;