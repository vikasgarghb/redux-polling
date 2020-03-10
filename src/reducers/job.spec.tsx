import reducer, { defaultJob } from './job';
import {
  ON_ERROR,
  ON_SUCCESS,
  JobStatus,
  ON_CREATE_JOB,
  ON_GET_STATUS,
  ON_COMPLETE_PROCESSING,
  ON_SUCCESS_GET_STATUS,
} from '../actions/job.types';

describe('Job Reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(defaultJob);
  });

  it('should handle ON_ERROR action', () => {
    expect(reducer(defaultJob, { type: ON_ERROR })).toMatchSnapshot();
  });

  it('should handle ON_GET_STATUS action', () => {
    expect(reducer(defaultJob, { type: ON_GET_STATUS })).toMatchSnapshot();
  });

  it('should handle ON_COMPLETE_PROCESSING action', () => {
    expect(reducer(defaultJob, { type: ON_COMPLETE_PROCESSING })).toMatchSnapshot();
  });

  it('should handle ON_SUCCESS action', () => {
    expect(
      reducer(defaultJob, {
        type: ON_SUCCESS,
        payload: { id: '123', status: JobStatus.Created },
      }),
    ).toMatchSnapshot();
  });

  it('should handle ON_CREATE_JOB action', () => {
    expect(reducer(defaultJob, { type: ON_CREATE_JOB })).toMatchSnapshot();
  });

  it('should handle ON_SUCCESS_GET_STATUS action', () => {
    expect(
      reducer(defaultJob, {
        type: ON_SUCCESS_GET_STATUS,
        payload: { status: JobStatus.Processing },
      }),
    ).toMatchSnapshot();
  });
});
