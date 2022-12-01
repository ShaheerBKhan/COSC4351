import renderer from 'react-test-renderer';
import styles from './Home.module.css';
import React from 'react';
import { Home } from './Home';

jest.mock('./Home.module.css');

const renderTree = tree => renderer.create(tree);
describe('<Home>', () => {
  it('should render component', () => {
    expect(renderTree(<Home 
    />).toJSON()).toMatchSnapshot();
  });
  
});