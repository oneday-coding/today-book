import axios from '../lib/axios';

export async function getUserInfo() {
  const response = await axios.get('/api/users/me');
  console.log('response: ', response);
  return response.data;
}

export function logout() {}
