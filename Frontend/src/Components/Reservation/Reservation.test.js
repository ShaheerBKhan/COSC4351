import renderer from 'react-test-renderer';
import { useState } from 'react';
import { reservationPost } from '../../Controller/Controller';
import Availability from './Availability';
import ConfirmTable from './ConfirmTable';
import PaymentCard from './PaymentCard';
import ReservationConfirmed from './ReservationConfirmed';
import { Reservation } from './Reservation';

jest.mock('../../Controller/Controller');
jest.mock('./Availability');
jest.mock('./ConfirmTable');
jest.mock('./PaymentCard');
jest.mock('./ReservationConfirmed');

const renderTree = tree => renderer.create(tree);
describe('<Reservation>', () => {
  it('should render component', () => {
    expect(renderTree(<Reservation 
    />).toJSON()).toMatchSnapshot();
  });
  
});