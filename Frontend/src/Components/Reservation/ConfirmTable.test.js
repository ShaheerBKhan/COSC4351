import renderer from 'react-test-renderer';
import styles from './Reservation.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Alert } from '../Alert/Alert';
import { tablesGet, profileGet } from '../../Controller/Controller';
import getEndTime from './getEndTime';
import getDate from './getDate';
import ConfirmTable from './ConfirmTable';

jest.mock('./Reservation.module.css');
jest.mock('../Alert/Alert');
jest.mock('../../Controller/Controller');
jest.mock('./getEndTime');
jest.mock('./getDate');

const renderTree = tree => renderer.create(tree);
describe('<ConfirmTable>', () => {
  it('should render component', () => {
    expect(renderTree(<ConfirmTable 
    />).toJSON()).toMatchSnapshot();
  });
  
});