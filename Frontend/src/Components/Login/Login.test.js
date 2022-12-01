import renderer from 'react-test-renderer';
import styles from './Login.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPost, verifyProfileStatus } from '../../Controller/Controller';
import { Alert } from '../Alert/Alert';
import { loginRequest, Login } from './Login';

jest.mock('./Login.module.css');
jest.mock('react-router-dom');
jest.mock('../../Controller/Controller');
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<Login>', () => {
  it('should render component', () => {
    expect(renderTree(<Login 
    />).toJSON()).toMatchSnapshot();
  });
  
});


describe('loginRequest', () => {
  it('should expose a function', () => {
		expect(loginRequest).toBeDefined();
	});
  
  it('loginRequest should return expected output', async () => {
    // const retValue = await loginRequest(credentials,setIsLoggedIn);
    expect(false).toBeTruthy();
  });
});