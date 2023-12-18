import axios from 'axios';
import { AuthUser } from './[...nextauth]/route';

interface PostKakaoLogin {
  accessToken: string;
}

interface PostKakaoLoginResponse {
  data: AuthUser;
}

export const postToken = async ({ accessToken }: PostKakaoLogin) => {
  const { data } = await axios.post<PostKakaoLoginResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
    {
      accessToken,
    },
  );

  return data;
};

interface PostRefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const postRefreshToken = async ({ accessToken }: { accessToken: string }) => {
  const { data } = await axios.post<PostRefreshTokenResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
    {
      accessToken,
    },
  );

  return data;
};
