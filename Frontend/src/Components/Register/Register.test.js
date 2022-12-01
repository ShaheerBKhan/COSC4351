import renderer from 'react-test-renderer';
import styles from './Register.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerPost } from '../../Controller/Controller';
import { Alert } from '../Alert/Alert';
import { loginRequest } from '../Login/Login';
import { generateUserId } from '../../App';
import { Register } from './Register';

jest.mock('./Register.module.css');
jest.mock('react-router-dom');
jest.mock('../../Controller/Controller');
jest.mock('../Alert/Alert');
jest.mock('../Login/Login');
jest.mock('../../App');

const renderTree = tree => renderer.create(tree);
describe('<Register>', () => {
  it('should render component', () => {
    expect(renderTree(<Register 
    />).toJSON()).toMatchSnapshot();
  });
  
});