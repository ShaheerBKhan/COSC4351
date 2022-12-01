import renderer from 'react-test-renderer';
import styles from './Reservation.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../Alert/Alert';
import ReservationConfirmed from './ReservationConfirmed';

jest.mock('./Reservation.module.css');
jest.mock('react-router-dom');
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<ReservationConfirmed>', () => {
  it('should render component', () => {
    expect(renderTree(<ReservationConfirmed 
    />).toJSON()).toMatchSnapshot();
  });
  
});