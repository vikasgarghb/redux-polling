import React from 'react';
import { shallow } from 'enzyme';

import ProcessorIcon from '.';

describe('ProcessorIco', () => {
  const wrapper = shallow(<ProcessorIcon />);
  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
