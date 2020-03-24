import React from 'react';
import { createJob } from '../../actions/job';
import { connect } from 'react-redux';
import { AppState } from 'src/store/types';
import Processing from '../../components/Processing';
import { Job, JobStatus } from '../../actions/job.types';
import { CreateJobStyled } from './styles';

export interface IProps {
  handleCreateJob: () => void;
  job?: Job;
}

export class CreateJob extends React.Component<IProps> {
  handleCreateButton = () => {
    this.props.handleCreateJob();
  };

  render() {
    const { job } = this.props;
    return (
      <CreateJobStyled>
        <button onClick={this.handleCreateButton}>Create Job</button>
        {job?.status === JobStatus.Processing && <Processing title="Processing" />}
        {job?.status === JobStatus.Completed && <span>Job Created!!!</span>}
      </CreateJobStyled>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = (state: AppState) => {
  return {
    processing: state.job.processing,
    fetching: state.job.fetching,
    job: state.job.job,
  };
};

const actionCreators = {
  handleCreateJob: createJob,
};

export default connect(mapStateToProps, actionCreators)(CreateJob);
