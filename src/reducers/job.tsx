import {
  JobState,
  JobStatus,
  ON_ERROR,
  ON_SUCCESS,
  ON_CREATE_JOB,
  ON_SUCCESS_GET_STATUS,
  ON_GET_STATUS,
  ON_COMPLETE_PROCESSING,
} from '../actions/job.types';

export const defaultJob: JobState = {
  fetching: false,
  processing: false,
};

const mapJobStatus = (state: JobState, jobStatus: JobStatus) => ({
  job: {
    ...state.job,
    status: jobStatus,
  },
});

/**
 * Reducer
 */
export default function jobReducer(state: JobState = defaultJob, action: any) {
  switch (action.type) {
    case ON_ERROR:
      return { ...state, ...mapJobStatus(state, JobStatus.Failed), processing: false };
    case ON_SUCCESS:
      return { ...state, job: action.payload };
    case ON_CREATE_JOB:
      return { ...state, processing: true };
    case ON_SUCCESS_GET_STATUS:
      return { ...state, ...mapJobStatus(state, action.payload), fetching: false };
    case ON_GET_STATUS:
      return { ...state, fetching: true };
    case ON_COMPLETE_PROCESSING:
      return { ...state, processing: false };
    default:
      return state;
  }
}
