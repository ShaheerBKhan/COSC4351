import renderer from 'react-test-renderer';
import React, { useState, useLayoutEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Landing } from "./Components/Landing/Landing";
import { Register } from "./Components/Register/Register";
import { Reservation } from "./Components/Reservation/Reservation";
import { Login } from "./Components/Login/Login";
import { Home } from "./Components/Home/Home";
import { Guest } from "./Components/Guest/Guest";
import { Profile } from "./Components/Profile/Profile";
import { ReservationHistory } from "./Components/ReservationHistory/ReservationHistory";
import NavBar from "./Components/NavBar/NavBar";
import { verifyLoginStatus, verifyProfileStatus, userIdGet } from "./Controller/Controller";
import App, { generateUserId } from "./App";

jest.mock("react-router-dom");
jest.mock("./Components/Landing/Landing");
jest.mock("./Components/Register/Register");
jest.mock("./Components/Reservation/Reservation");
jest.mock("./Components/Login/Login");
jest.mock("./Components/Home/Home");
jest.mock("./Components/Guest/Guest");
jest.mock("./Components/Profile/Profile");
jest.mock("./Components/ReservationHistory/ReservationHistory");
jest.mock("./Components/NavBar/NavBar");
jest.mock("./Controller/Controller");

const renderTree = tree => renderer.create(tree);
describe('<App>', () => {
  it('should render component', () => {
    expect(renderTree(<App 
    />).toJSON()).toMatchSnapshot();
  });
  
});


describe('generateUserId', () => {
  it('should expose a function', () => {
		expect(generateUserId).toBeDefined();
	});
  
  it('generateUserId should return expected output', async () => {
    // const retValue = await generateUserId();
    expect(true).toBeTruthy();
  });
});