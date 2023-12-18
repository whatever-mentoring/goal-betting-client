import axios, { AxiosError, AxiosResponse } from 'axios';
import { signIn } from 'next-auth/react';

const client = axios.create({
  baseURL: '',
});

client.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // 응답을 그대로 리턴
    return response;
  },
  (error: AxiosError): Promise<never> => {
    // Axios 에러 처리
    if (error.response) {
      if (error.response.status === 401) {
        signIn('kakao', { redirect: false });
      }
    } else if (error.request) {
      // 요청이 만들어졌지만 응답을 받지 못한 경우
    } else {
      // 요청을 만드는 중에 다른 오류가 발생한 경우
    }
    // 처리한 후 에러를 다시 throw
    return Promise.reject(error);
  },
);

export default client;
