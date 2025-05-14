import Cookies from 'js-cookie';

const TokenKey = 'tgu-csdn-token';
const RefreshTokenKey = 'tgu-csdn-refresh-token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey);
}

export function setRefreshToken(refreshToken: string) {
  return Cookies.set(RefreshTokenKey, refreshToken);
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey);
}
