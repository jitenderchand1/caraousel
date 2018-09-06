import React from 'react';
import { shallow } from 'enzyme';
import Caraousel from './';
import Slide from './Slide';

describe('<Caraousel /> component test cases', () => {
  it('checks if appendPreviousItem method works correctly', () => {
    const wrapper = shallow(<Caraousel images={[1,2,3,4,5,6]} />);
    expect(wrapper.instance().appendPreviousItem(3)).toBe(1);
    expect(wrapper.instance().appendPreviousItem(2)).toBe(6);
  });
  it('checks if appendNextItem method works correctly', () => {
    const wrapper = shallow(<Caraousel images={[1,2,3,4,5,6]} />);
    expect(wrapper.instance().appendNextItem(3)).toBe(1);
    expect(wrapper.instance().appendNextItem(2)).toBe(6);
  });
  it('checks if moveNext method works correctly', () => {
    const wrapper = shallow(<Caraousel images={[1,2,3,4,5,6]} />);
    wrapper.instance().moveNext();
    wrapper.instance().moveNext();
  });
  it('checks if movePrev method works correctly', () => {
    const wrapper = shallow(<Caraousel images={[1,2,3,4,5,6]} />);
    wrapper.instance().movePrev();
    wrapper.instance().movePrev();
  });
})