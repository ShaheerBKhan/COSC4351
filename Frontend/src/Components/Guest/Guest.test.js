import renderer from 'react-test-renderer';
import styles from './Guest.module.css';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilePost, profileGet } from '../../Controller/Controller';
import { Alert } from '../Alert/Alert';
import { Guest } from './Guest';

jest.mock('./Guest.module.css');
jest.mock('react-router-dom');
jest.mock('../../Controller/Controller');
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<Guest>', () => {
  it('should render component', () => {
    expect(renderTree(<Guest 
    />).toJSON()).toMatchSnapshot();
  });
  
});