import renderer from 'react-test-renderer';
import styles from './Profile.module.css';
import { useState } from 'react';
import { Alert } from '../Alert/Alert';
import MailingAddress from './MailingAddress';

jest.mock('./Profile.module.css');
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<MailingAddress>', () => {
  it('should render component', () => {
    expect(renderTree(<MailingAddress 
    />).toJSON()).toMatchSnapshot();
  });
  
});