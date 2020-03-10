import React from 'react';
import { shallow } from 'enzyme';
import ReduxPollingApp from '.';

describe('App', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ReduxPollingApp />);
    expect(wrapper).toMatchSnapshot();
  });
});
