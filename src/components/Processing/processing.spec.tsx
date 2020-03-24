import React from 'react';
import { shallow } from 'enzyme';

import Processing from '.';

describe('Processing', () => {
  const wrapper = shallow(<Processing title={'processing'} />);
  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
