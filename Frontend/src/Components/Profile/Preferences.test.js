import renderer from 'react-test-renderer';
import styles from './Profile.module.css';
import { useState } from 'react';
import { Alert } from '../Alert/Alert';
import Preferences from './Preferences';

jest.mock('./Profile.module.css');
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<Preferences>', () => {
  it('should render component', () => {
    expect(renderTree(<Preferences 
    />).toJSON()).toMatchSnapshot();
  });
  
});