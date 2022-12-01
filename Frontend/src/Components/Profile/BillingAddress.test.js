import renderer from 'react-test-renderer';
import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import { Alert } from '../Alert/Alert';
import BillingAddress from './BillingAddress';

jest.mock('./Profile.module.css');
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<BillingAddress>', () => {
  it('should render component', () => {
    expect(renderTree(<BillingAddress 
    />).toJSON()).toMatchSnapshot();
  });
  
});