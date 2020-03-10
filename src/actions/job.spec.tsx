import * as jobActions from './job';

describe('Job Actions', () => {
  it.each`
    label                      | method
    ${'create job'}            | ${jobActions.createJob}
    ${'issue job is complete'} | ${jobActions.jobIsComplete}
  `('should $label', ({ method }) => {
    expect(method()).toMatchSnapshot();
  });

  it('should get the status of given job', () => {
    expect(jobActions.getJobStatus('123')).toMatchSnapshot();
  });
});
