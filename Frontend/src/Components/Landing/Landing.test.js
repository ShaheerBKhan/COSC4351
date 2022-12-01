import renderer from 'react-test-renderer';
import styles from './Landing.module.css';
import React from 'react';
import { Landing } from './Landing';

jest.mock('./Landing.module.css');

const renderTree = tree => renderer.create(tree);
describe('<Landing>', () => {
  it('should render component', () => {
    expect(renderTree(<Landing 
    />).toJSON()).toMatchSnapshot();
  });
  
});