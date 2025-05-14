import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  getToken, getRefreshToken, setToken, setRefreshToken, removeToken, removeRefreshToken,
} from '@/utils/auth/index.ts';
import router from '@/router/index.ts';

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests: Function[] = [];

// api 前缀
const baseUrl = process.env.VUE_APP_BASE_API;

/**
 * 判断是否为开发环境
 */
function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * 请求接口日志记录
 */
function printRequest(req: AxiosRequestConfig) {
  if (isDevelopment()) {
    console.log(`[request] 发起 ${req.method} 请求：${baseUrl}${req.url}`, req.data || req.params || '无参数', req);
  }
}

/**
 * 响应接口日志记录
 */
function printResponse(res: AxiosResponse) {
  if (isDevelopment()) {
    console.log(`[request] ${res.config.url} 响应结果：`, res);
  }
}

// 创建服务实例
const http = axios.create({
  baseURL: baseUrl,
  timeout: 8000,
  headers: {},
});

// 刷新 token
async function refreshToken() {
  const res = await http.request({
    url: `${baseUrl}user/refresh`,
    method: 'GET',
    params: {
      refreshToken: getRefreshToken(),
    },
  });
  if (res.data.state !== 200) {
    throw Error();
  }
  return res;
}

// // 请求拦截器
http.interceptors.request.use((config) => {
  // 如果有 token，则带上
  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  printRequest(config);
  return config;
});

// 响应拦截器
http.interceptors.response.use((response) => {
  printResponse(response);

  // 无感刷新 token
  if (response.data.state === 102) {
    const { config } = response;
    if (!isRefreshing) {
      isRefreshing = true;
      return refreshToken().then((res) => {
        const { token } = res.data;
        setToken(token);
        setRefreshToken(res.data.refreshToken);
        console.log('[request] Refresh token success.');
        config.headers.Authorization = `Bearer ${token}`;
        // 已经刷新了token，将所有队列中的请求进行重试
        requests.forEach((cb) => cb(token));
        requests = [];
        return http(config);
      }).catch(async (res) => {
        // 无法刷新 token，需要重新登录
        console.error('[request] Refresh token error =>', res);
        // 清除 token
        removeToken();
        removeRefreshToken();
        // 重定向到登录页面
        // Modal.error({
        //   title: '登录状态失效',
        //   content: '请重新登录',
        //   onOk() {
        router.push({ name: 'Login' });
        //   },
        // });

        // 抛出错误，阻止本次请求
        const error = new Error('登录态过期');
        // error.response = response
        throw error;
      }).finally(() => {
        isRefreshing = false;
      });
    }
    // 正在刷新token，返回一个未执行resolve的promise
    return new Promise((resolve) => {
      // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
      requests.push((token: string) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        resolve(http(config));
      });
    });
  }

  // 自定义错误判断
  if (response.data.state !== 200) {
    // message.error(response.data.message);
    const error = new Error(response.data.message);
    throw error;
  }

  return response;
}, (error) => {
  // message.error(error.message);
  Promise.reject(error.message);
});

export default http;
