import axios from 'axios'

axios.interceptors.request.use(function(config) {
	config.headers.common['Authorization'] = 'BasicAuth ' + localStorage.ticket
	return config
}, function(error) {
	return Promise.reject(error)
})
function apiAxios(method, url, params, options, _eventInstance, root) {
	return new Promise((resolve, reject) => {
		let basicParam = {
			method: method,
			url: url,
			data: method === 'POST' || method === 'PUT' ? params : null,
			params: method === 'GET' || method === 'DELETE' ? params : null,
			baseURL: root,
			// withCredentials: true,
			timeout: 30000
        }
		axios(Object.assign(basicParam, options)).then(function(res) {
            console.log(res)
            if (!root) {
                resolve(res.data)
            } else if(res.config.responseType == 'arraybuffer') {
				resolve(res.data)
			} else if (res.data.retCode === '000000') {
				// 如果状态成功，执行成功的回调函数
				resolve(res.data)
			} else {
				// 如果状态失败，执行失败的回调函数，并提示相应信息
				_eventInstance.emit('Request_Error', res.data)
				reject(res.data)
			}
		}).catch(function(err) {
			if (err.toString().indexOf('timeout') !== -1) {
				_eventInstance.emit('Request_Error', {
					description: '请求超时'
				})
			} else {
				let res = err.response
				if (res && res.status === 500) {
					_eventInstance.emit('Request_Error', {
						description: '服务器出错啦'
					})
				}
			}
			reject()
		})
	})
}
  
export function ajaxApi(eventInstance, root) {
	return {
		get: function(url, params, options) {
			return apiAxios('GET', url, params, options, eventInstance, root)
		},
		post: function(url, params, options) {
			return apiAxios('POST', url, params, options, eventInstance, root)
		},
		put: function(url, params, options) {
			return apiAxios('PUT', url, params, options, eventInstance, root)
		},
		delete: function(url, params, options) {
			return apiAxios('DELETE', url, params, options, eventInstance, root)
		}
	}
}