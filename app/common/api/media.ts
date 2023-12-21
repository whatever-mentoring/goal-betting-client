import { useMutation } from '@tanstack/react-query';
import client from './client';
import { withSessionUser } from './withSessionUser';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: ErrorResponse;
}
export interface ErrorResponse {
  code: string;
  detailMessage: string;
}

export type Data = string;

interface RequestInterface {
  postData: {
    multipartFile: File;
  };
}

const postAPI = withSessionUser(async ({ postData }: RequestInterface) => {
  const formData = new FormData();
  Object.entries(postData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  });
  const { data } = await client<Json>({
    method: 'post',
    url: '/v1/api/s3',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
});

export interface PostAPIRequest {
  token?: string;
}

const POST_MEDIA_FILE_KEY = () => ['mediaFile'];

interface postMediaFileMutation {
  onSuccess: (data: Json) => void;
}

export const usePOSTMediaFileMutation = ({ onSuccess }: postMediaFileMutation) => {
  return useMutation({
    mutationKey: POST_MEDIA_FILE_KEY(),
    mutationFn: postAPI,
    onSuccess,
  });
};
