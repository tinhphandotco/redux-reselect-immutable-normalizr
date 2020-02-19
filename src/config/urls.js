import { BASE_PATH, API_URL } from './index';

export const staticUrl = (url) => `/${BASE_PATH}/${url}`;
export const mediaUrl = (url) => `${API_URL}/${url}`;
