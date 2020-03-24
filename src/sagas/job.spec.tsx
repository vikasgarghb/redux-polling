import { expectSaga } from 'redux-saga-test-plan';
import { call, getContext, delay } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';

import jobSagas from './job';
import {
  ON_COMPLETE_PROCESSING,
  ON_CREATE_JOB,
  ON_ERROR,
  ON_GET_STATUS,
  ON_SUCCESS,
  ON_SUCCESS_GET_STATUS,
  JobStatus,
} from '../actions/job.types';
import { mockApiClient } from '../mocks/mockApiClient';

const apiClient = getContext('apiClient');
const error = new Error('error');

const state = {
  job: {
    job: {
      id: '123',
      status: JobStatus.Created,
    },
  },
};

Object.defineProperty(document, 'location', {});

describe('jobSagas', () => {
  describe('createJob', () => {
    const apiRequest = call(mockApiClient.post, '/job', {});

    it('should post request for creating data', async () => {
      return expectSaga(jobSagas)
        .provide([
          [apiClient, mockApiClient],
          [apiRequest, { data: { id: '123', status: JobStatus.Created } }],
        ])
        .dispatch({ type: ON_CREATE_JOB, payload: {} })
        .put({
          payload: { id: '123', status: JobStatus.Created },
          type: ON_SUCCESS,
        })
        .silentRun();
    });

    it('should handle errors', () => {
      return expectSaga(jobSagas)
        .provide([
          [apiClient, mockApiClient],
          [apiRequest, error],
        ])
        .dispatch({ type: ON_CREATE_JOB, payload: {} })
        .put({
          error,
          type: ON_ERROR,
        })
        .silentRun();
    });
  });

  describe('getStatus', () => {
    const action = {
      jobId: '123',
    };
    const apiRequest = call(mockApiClient.get, '/job/123/status');

    it('should make request to get status of given id', () => {
      return expectSaga(jobSagas)
        .provide([
          [apiClient, mockApiClient],
          [apiRequest, { data: JobStatus.Processing }],
        ])
        .dispatch({ ...action, type: ON_GET_STATUS })
        .put({
          payload: JobStatus.Processing,
          type: ON_SUCCESS_GET_STATUS,
        })
        .silentRun();
    });

    it('should handle errors', () => {
      return expectSaga(jobSagas)
        .provide([
          [apiClient, mockApiClient],
          [apiRequest, error],
        ])
        .dispatch({ ...action, type: ON_GET_STATUS })
        .put({
          error,
          type: ON_ERROR,
        })
        .silentRun();
    });
  });

  describe('startPollingForStatus', () => {
    const apiRequest = call(mockApiClient.get, '/job/123/getStatus');

    it('should start polling for fetching the status of given job', () => {
      return expectSaga(jobSagas)
        .provide([
          [apiClient, mockApiClient],
          [apiRequest, JobStatus.Created],
        ])
        .withState(state)
        .dispatch({ type: ON_SUCCESS })
        .put({
          jobId: '123',
          type: ON_GET_STATUS,
        })
        .silentRun();
    });
  });

  describe('isJobComplete', () => {
    it.each`
      label | status | put
      ${'issue job is complete state change'} | ${JobStatus.Completed} | ${{
  type: ON_COMPLETE_PROCESSING,
}}
      ${'handle error condition when status is failed'} | ${JobStatus.Failed} | ${{
  type: ON_ERROR,
}}
      ${'handle get export status is job is created'} | ${JobStatus.Created} | ${{
  jobId: '123',
  type: ON_GET_STATUS,
}}
      ${'handle get export status is job is processing'} | ${JobStatus.Processing} | ${{
  jobId: '123',
  type: ON_GET_STATUS,
}}
    `('should $label', ({ status, put }) => {
      return expectSaga(jobSagas)
        .provide([
          [apiClient, mockApiClient],
          [matchers.call.fn(delay), null],
        ])
        .withState({
          ...state,
          job: {
            ...state.job,
            job: { ...state.job.job, status },
          },
        })
        .dispatch({ type: ON_SUCCESS_GET_STATUS })
        .put(put)
        .silentRun(2000);
    });
  });
});
