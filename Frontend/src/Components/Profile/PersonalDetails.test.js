import renderer from 'react-test-renderer';
import styles from './Profile.module.css';
import { useState } from 'react';
import { Alert } from '../Alert/Alert';
import PersonalDetails from './PersonalDetails';

jest.mock('./Profile.module.css');
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<PersonalDetails>', () => {
  it('should render component', () => {
    expect(renderTree(<PersonalDetails 
    />).toJSON()).toMatchSnapshot();
  });
  
});