import axios from 'axios'

let default_options = {
    withCredentials: true,
    timeout: 30000
}

export function createAxiosInstance(options) {
    let axiosOptions = Object.assign(default_options, options)
    let axiosInstance = axios.create(axiosOptions)

    axiosInstance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        console.log(config)
        return config;
    }, function (error) {
        // 对请求错误做些什么
        console.log(error)
        return Promise.reject(error);
    });
    
    // 添加响应拦截器
    axiosInstance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        console.log(response)
        return response;
    }, function (error) {
        // 对响应错误做点什么
        console.log(error)
        return Promise.reject(error);
    });
    return axiosInstance
}