import {
  ON_SUCCESS,
  ON_ERROR,
  ON_SUCCESS_GET_STATUS,
  ON_CREATE_JOB,
  ON_GET_STATUS,
  JobStatus,
} from '../actions/job.types';
import { select, put, delay, takeLatest, all } from 'redux-saga/effects';
import { getJob } from '../selectors/job';
import { post, get } from './common';
import { getJobStatus, jobIsComplete } from '../actions/job';

export function* createJob(action) {
  const { payload } = action;

  yield post({
    url: '/job',
    onSuccess: ON_SUCCESS,
    onError: ON_ERROR,
    data: payload,
  });
}

export function* startPollingForStatus() {
  const job = yield select(state => getJob(state));
  yield put(getJobStatus(job.id));
}

export function* getStatus(action) {
  const { jobId } = action;

  yield get({
    url: `/job/${jobId}/status`,
    onSuccess: ON_SUCCESS_GET_STATUS,
    onError: ON_ERROR,
  });
}

export function* isJobComplete() {
  const job = yield select(state => getJob(state));
  if (job.status === JobStatus.Completed) {
    return yield put(jobIsComplete());
  }

  if ([JobStatus.Created, JobStatus.Processing].includes(job.status)) {
    yield delay(2000);
    return yield put(getJobStatus(job.id));
  }

  yield put({
    type: ON_ERROR,
  });
}

export default function* root() {
  return yield all([
    takeLatest(ON_CREATE_JOB, createJob),
    takeLatest(ON_GET_STATUS, getStatus),
    takeLatest(ON_SUCCESS, startPollingForStatus),
    takeLatest(ON_SUCCESS_GET_STATUS, isJobComplete),
  ]);
}
