import { BASE_PATH, SERVER_URL } from './index';

export const staticUrl = (url) => `/${BASE_PATH}/${url}`;
export const mediaUrl = (url) => `${SERVER_URL}/${url}`;
