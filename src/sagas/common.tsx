import { AxiosResponse } from 'axios';
import { call, getContext, put } from 'redux-saga/effects';
import isNil from 'lodash/isNil';

interface IConfig {
  url: string;
  data?: object;
  onSuccess: string;
  onError: string;
  method?: string;
}

export function* get(config: IConfig) {
  const apiClient = yield getContext('apiClient');
  const { url, onSuccess, onError } = config;
  try {
    const response: AxiosResponse = yield call(apiClient.get, url);
    if (response && !isNil(response.data)) {
      yield put({ type: onSuccess, payload: response.data });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: onError, error });
  }
}

export function* post(config: IConfig) {
  const apiClient = yield getContext('apiClient');
  const { url, data, onSuccess, onError } = config;

  try {
    const response: AxiosResponse = yield call(apiClient.post, url, data);
    if (response && !isNil(response.data)) {
      yield put({ type: onSuccess, payload: response.data });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: onError, error });
  }
}
