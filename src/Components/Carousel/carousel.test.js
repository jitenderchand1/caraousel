import React from 'react';
import { shallow } from 'enzyme';
import Carousel from './';

describe('<Carousel /> component test cases', () => {
  it('checks if appendPreviousItem method works correctly', () => {
    const wrapper = shallow(<Carousel images={[1,2,3,4,5,6]} />);
    expect(wrapper.instance().appendPreviousItem(3)).toBe(1);
    expect(wrapper.instance().appendPreviousItem(2)).toBe(6);
  });
  it('checks if appendNextItem method works correctly', () => {
    const wrapper = shallow(<Carousel images={[1,2,3,4,5,6]} />);
    expect(wrapper.instance().appendNextItem(3)).toBe(1);
    expect(wrapper.instance().appendNextItem(2)).toBe(6);
  });
  it('checks if moveToNextSlide method works correctly', () => {
    const wrapper = shallow(<Carousel images={[1,2,3,4,5,6]} />);
    wrapper.instance().moveToNextSlide();
    wrapper.instance().moveToNextSlide();
  });
  it('checks if moveToPrevSlide method works correctly', () => {
    const wrapper = shallow(<Carousel images={[1,2,3,4,5,6]} />);
    wrapper.instance().moveToPrevSlide();
    wrapper.instance().moveToPrevSlide();
  });
})