import React from 'react';
import { shallow } from 'enzyme';

import { CreateJob, IProps } from '.';
import { JobStatus } from '../../actions/job.types';

describe('CreateJob', () => {
  const props: IProps = {
    handleCreateJob: jest.fn(),
  };

  afterEach(() => {
    props.job = undefined;
  });

  it('Should match snapshot', () => {
    const wrapper = shallow(<CreateJob {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot with processing icon', () => {
    props.job = { id: '123', status: JobStatus.Processing };
    const wrapper = shallow(<CreateJob {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot with job completed', () => {
    props.job = { id: '123', status: JobStatus.Completed };
    const wrapper = shallow(<CreateJob {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Functions', () => {
    it('should call handleCreateJob', () => {
      const wrapper = shallow(<CreateJob {...props} />);
      const instance = wrapper.instance() as CreateJob;
      instance.handleCreateButton();
      expect(props.handleCreateJob).toHaveBeenCalled();
    });
  });
});
