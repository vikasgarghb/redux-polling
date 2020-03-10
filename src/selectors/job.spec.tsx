import { AppState } from '../store/types';
import { JobStatus } from '../actions/job.types';
import { getJob } from './job';

describe('JobSelector', () => {
  it('should return the job set on state', () => {
    expect(
      getJob({
        job: {
          job: { id: '123', status: JobStatus.Created },
        },
      } as AppState),
    ).toMatchSnapshot();
  });
});
