export const ON_CREATE_JOB = 'ON_CREATE_JOB';
export const ON_GET_STATUS = 'ON_GET_STATUS';
export const ON_SUCCESS = 'ON_SUCCESS';
export const ON_SUCCESS_GET_STATUS = 'ON_SUCCESS_GET_STATUS';
export const ON_ERROR = 'ON_ERROR';
export const ON_COMPLETE_PROCESSING = 'ON_COMPLETE_PROCESSING';

export interface JobState {
  job?: Job;
  processing?: boolean;
  fetching?: boolean;
}

export enum JobStatus {
  Created = 'Created',
  Processing = 'Processing',
  Completed = 'Completed',
  Failed = 'Failed',
}

export interface Job {
  id: string;
  status: JobStatus;
}
