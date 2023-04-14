import { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import { fromUnixTime, isBefore } from 'date-fns';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import LocalStorageKeys from '@/cdn/enums/LocalStorageKeys';
import {
  AuthToken,
  AuthTokenPayload,
} from '@/features/authentication/types/AuthToken';
import api from '@/cdn/utils/api';

const getLocalAuthToken = (): AuthToken | null => {
  const localAuthToken = localStorage.getItem(LocalStorageKeys.AUTH);

  if (localAuthToken) {
    try {
      return JSON.parse(localAuthToken);
    } catch (err) {
      return null;
    }
  }

  return null;
};

const setLocalAuthToken = (token: AuthToken) => {
  localStorage.setItem(LocalStorageKeys.AUTH, JSON.stringify(token));
};

const removeLocalAuthToken = () => {
  localStorage.removeItem(LocalStorageKeys.AUTH);
};

const isValidToken = (token: AuthToken): boolean => {
  return token.hasOwnProperty('token') && token.hasOwnProperty('refresh_token');
};

const getAuthTokenPayload = (token: AuthToken): AuthTokenPayload | null => {
  return jwt.decode(token.token) as AuthTokenPayload;
};

const isValidTokenPayload = (tokenPayload: AuthTokenPayload): boolean => {
  return (
    tokenPayload.hasOwnProperty('email') &&
    tokenPayload.hasOwnProperty('exp') &&
    tokenPayload.hasOwnProperty('iat') &&
    tokenPayload.hasOwnProperty('roles')
  );
};

const isExpiredAuthToken = (tokenPayload: AuthTokenPayload): boolean => {
  const authTokenExpirationDate = fromUnixTime(tokenPayload.exp);
  return isBefore(authTokenExpirationDate, new Date());
};

const fetchRefreshToken = async (token: AuthToken): Promise<AuthToken> => {
  const res: AxiosResponse<AuthToken> = await api
    .post(ApiRoutes.AUTH_REFRESH_TOKEN, token)
    .catch((err) => {
      console.log(err);
      return err;
    });

  return res.data;
};

const authService = {
  getLocalAuthToken,
  setLocalAuthToken,
  removeLocalAuthToken,
  isValidToken,
  getAuthTokenPayload,
  isValidTokenPayload,
  isExpiredAuthToken,
  fetchRefreshToken,
};

export default authService;