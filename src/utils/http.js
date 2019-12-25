/**
 * 封装全局的请求和相应拦截器
 */
import axios from 'axios'

const http = axios.create({ timeout: 100000 }); //实例化一个axios对象，并设置请求超时时间为100s
// http.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/' : ''; //如果是开发环境就设置请求跨域代理，如果是生产服务器则为空

//添加请求拦截器
http.interceptors.request.use(
	config => { config.headers.token = ''; return config; }, //!
	err => Promise.reject(err)
);

//添加响应拦截器
http.interceptors.response.use(
	res => Promise.resolve(res), 
	err => {
		// err.response && getXhrState(err,err.response.status); 
		return Promise.reject(err);
	}
); 

function getXhrState (err,status){
  switch (status) {
		case 404:
			err.message = '请求地址不存在(404)';
			break;
		case 408:
			err.message = '请求超时(408)';
			break;
		case 500:
			err.message = '服务器错误(500)';
			break;
		case 502:
			err.message = '网络错误(502)';
			break;
		case 503:
			err.message = '服务不可用(503)';
			break;
		case 504:
			err.message = '网络超时(504)';
			break;
		case 505:
			err.message = 'HTTP版本不受支持(505)';
			break;
  }
  //! 在这里添加错误信息弹出窗口
};

// 封装 get 请求
export const $get = (url, params={},isLoad=true) => {
  return http.get(url, { params }).then(res => _res(isLoad,res.data))
}

// 封装 post 请求
export const $post = (url,params={},isLoad=true) => {
	return http.post(url,params).then(res => _res(isLoad,res.data))
}

// 封装 formData 请求
export const $formData = (url,params={},isLoad=true) => {
	if (!(params instanceof Object)) {
		console.error('params必须是对象!')
    return
	}
	let newParams = new FormData();
	for (let i in params) newParams.append(i,params[i]);
	return http.post(url,newParams,{ headers:{'Content-Type':'multipart/form-data'} }).then(res => _res(isLoad,res.data))
}

//私有方法：处理http请求响应数据
function _res (isLoad,data) {
	return data;
} 

/**
 * 
用axios一次请求多个接口
axios
 .all([ axios.get('/data'), axios.get('/city') ])
 .then(
   axios.spread( (dataRes, cityRes) => {
     console.log(dataRes,cityRes)
   })
 )
*/