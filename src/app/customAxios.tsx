import axios from 'axios';
import { getAccessToken, removeAccessToken, setAccessToken } from '../shared/utils/tokenHandler';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * 토큰 X
 */
const publicAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// refresh 이용한 aceess 재발급
const refreshAccessToken = async () => {
  try {
    const response = await privateAxios.post('/user/v1/auth/reissue');
    const newAccessToken = response.headers['authorization'];
    if (newAccessToken) {
      setAccessToken(newAccessToken);
    } else {
      throw new Error('새로운 액세스 토큰을 받아오지 못했습니다.');
    }
    return newAccessToken;
  } catch (error: any) {
    console.error('리프레시 토큰 요청 실패:', error);
    if (
      error.response.status === 401 &&
      (error.response.status.code === 'TOKEN4001' ||
        error.response.status.code === 'TOKEN4002' ||
        error.response.status.code === 'TOKEN4003' ||
        error.response.status.code === 'TOKEN4004')
    ) {
      removeAccessToken();
      toast.error('다시 로그인해주세요.');
      window.location.href = '/login';
    }
    throw error;
  }
};

/**
 * 토큰 O
 */
const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 &&
      (error.response.data.code === 'TOKEN4005' || // 엑세스 토큰이 헤더에 없는 경우
        error.response.data.code === 'TOKEN4006' || // 만료된 엑세스 토큰인 경우
        error.response.data.code === 'TOKEN4007' || // 유효하지 않은 엑세스 토큰인 경우
        error.response.data.code === 'TOKEN4008') // 엑세스 토큰이 없는 경우.
    ) {
      const originRequest = error.config; // 원래의 요청정보
      originRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken(); // 토큰 재발급 요청
        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return privateAxios(originRequest); // 재요청
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export { publicAxios, privateAxios };
