import { AppState } from '../store/types';
import { get } from 'lodash';

export const getJob = (state: AppState) => get(state, 'job.job', {});
