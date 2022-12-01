import renderer from 'react-test-renderer';
import styles from "./Reservation.module.css";
import { useState } from "react";
import { Alert } from '../Alert/Alert';
import PaymentCard from "./PaymentCard";

jest.mock("./Reservation.module.css");
jest.mock('../Alert/Alert');

const renderTree = tree => renderer.create(tree);
describe('<PaymentCard>', () => {
  it('should render component', () => {
    expect(renderTree(<PaymentCard 
    />).toJSON()).toMatchSnapshot();
  });
  
});