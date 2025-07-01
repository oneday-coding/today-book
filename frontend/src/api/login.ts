import axios from "../lib/axios";

export async function getMyInfo() {
  const response = await axios.get('/api/auth/me');
  return response.data.item;
}

export function getUserInfo() {
  return axios.get('/api/auth/kakao/user');
}

export function logout() {}