import renderer from 'react-test-renderer';
import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilePost, profileGet } from '../../Controller/Controller';
import PersonalDetails from './PersonalDetails';
import MailingAddress from './MailingAddress';
import BillingAddress from './BillingAddress';
import Preferences from './Preferences';
import { Loader } from '../Loader/Loader';
import { Profile } from './Profile';

jest.mock('react-router-dom');
jest.mock('../../Controller/Controller');
jest.mock('./PersonalDetails');
jest.mock('./MailingAddress');
jest.mock('./BillingAddress');
jest.mock('./Preferences');
jest.mock('../Loader/Loader');

const renderTree = tree => renderer.create(tree);
describe('<Profile>', () => {
  it('should render component', () => {
    expect(renderTree(<Profile 
    />).toJSON()).toMatchSnapshot();
  });
  
});