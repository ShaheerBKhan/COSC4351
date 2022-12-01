import renderer from 'react-test-renderer';
import styles from './ReservationHistory.module.css';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { reservationGet } from '../../Controller/Controller';
import { ReservationHistory } from './ReservationHistory';

jest.mock('./ReservationHistory.module.css');
jest.mock('react-router-dom');
jest.mock('../../Controller/Controller');

const renderTree = tree => renderer.create(tree);
describe('<ReservationHistory>', () => {
  it('should render component', () => {
    expect(renderTree(<ReservationHistory 
    />).toJSON()).toMatchSnapshot();
  });
  
});