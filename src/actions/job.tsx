import { ON_CREATE_JOB, ON_GET_STATUS, ON_COMPLETE_PROCESSING } from './job.types';

export function createJob() {
  return {
    type: ON_CREATE_JOB,
  };
}

export function getJobStatus(jobId: string) {
  return {
    type: ON_GET_STATUS,
    jobId,
  };
}

export function jobIsComplete() {
  return {
    type: ON_COMPLETE_PROCESSING,
  };
}
