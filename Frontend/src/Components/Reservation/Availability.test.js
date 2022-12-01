import renderer from 'react-test-renderer';
import styles from './Reservation.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Alert } from '../Alert/Alert';
import isHighTrafficDay from './isHighTrafficDay';
import minDateAttribute from './minDateAttribute';
import minTimeWarning from './minTimeWarning';
import validateDate from './validateDate';
import validateTime from './validateTime';
import Availability from './Availability';

jest.mock('./Reservation.module.css');
jest.mock('../Alert/Alert');
jest.mock('./isHighTrafficDay');
jest.mock('./minDateAttribute');
jest.mock('./minTimeWarning');
jest.mock('./validateDate');
jest.mock('./validateTime');

const renderTree = tree => renderer.create(tree);
describe('<Availability>', () => {
  it('should render component', () => {
    expect(renderTree(<Availability 
    />).toJSON()).toMatchSnapshot();
  });
  
});