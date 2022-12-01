import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilePost, profileGet } from '../../Controller/Controller';
import PersonalDetails from './PersonalDetails';
import MailingAddress from './MailingAddress';
import BillingAddress from './BillingAddress';
import Preferences from './Preferences';
import { Loader } from '../Loader/Loader';

const loaderStyling = {
	"backgroundColor": "transparent",
	"position": "absolute",
	"marginLeft": "45%",
	"marginTop": "25%",
}

const generateDinerNumber = () => {
    return Math.floor(Math.random()*90000) + 10000;
}

const getEarnedPoints = () => {
    return 0;
}

export const Profile = ( {profileExists, setProfileExists, guestProfileExists} ) => {
    const [state, setState] = useState({
        step: 0,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        mailingAddress1: '',
        mailingAddress2: '',
        mailingCity: '',
        mailingState: '',
        mailingZip: '',
        billingAddress1: '',
        billingAddress2: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        paymentMethod: '',
        billingCheckbox: false,
        dinerNumber: generateDinerNumber(),
        earnedPoints: getEarnedPoints()
    });
    const [showLoader, setShowLoader] = useState(false);

    useLayoutEffect(() => {
        const getProfile = async () => {
            setShowLoader(true)
            const result = await profileGet(localStorage.getItem("userId"));
            const profile = result.data;
            setState({
                ...state,
                firstName: profile.firstName,
                lastName: profile.lastName,
                phone: profile.phone,
                email: profile.email,
                mailingAddress1: profile.mailingAddress1,
                mailingAddress2: profile.mailingAddress2,
                mailingCity: profile.mailingCity,
                mailingState: profile.mailingState,
                mailingZip: profile.mailingZip,
                billingAddress1: profile.billingAddress1,
                billingAddress2: profile.billingAddress2,
                billingCity: profile.billingCity,
                billingState: profile.billingState,
                billingZip: profile.billingZip,
                paymentMethod: profile.paymentMethod,
                dinerNumber: profile.dinerNumber ? profile.dinerNumber : generateDinerNumber(),
                earnedPoints: profile.earnedPoints ? profile.earnedPoints : getEarnedPoints(),
                billingCheckbox: profile.billingCheckbox
            });
        }

        if (profileExists || guestProfileExists) {
            getProfile().then(() => {
                setTimeout(() => {
                    setShowLoader(false);
                }, 500)
            });
        }
    }, []);

    const prevStep = () => {
        setState({...state, step: state.step - 1 });
    };
    
    const nextStep = () => {
        setState({...state, step: state.step + 1 });
    };

    const handleChange = (field, value) => {
        setState({...state, [field]: value });
    }

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const info = {
            firstName: state.firstName,
            lastName: state.lastName,
            phone: state.phone,
            email: state.email,
            mailingAddress1: state.mailingAddress1,
            mailingAddress2: state.mailingAddress2,
            mailingCity: state.mailingCity,
            mailingState: state.mailingState,
            mailingZip: state.mailingZip,
            billingAddress1: state.billingAddress1,
            billingAddress2: state.billingAddress2,
            billingCity: state.billingCity,
            billingState: state.billingState,
            billingZip: state.billingZip,
            billingCheckbox: state.billingCheckbox,
            paymentMethod: state.paymentMethod,
            dinerNumber: state.dinerNumber ? state.dinerNumber : generateDinerNumber(),
            earnedPoints: state.earnedPoints ? state.earnedPoints : getEarnedPoints(),
            userId: localStorage.getItem("userId")
        };

        const response = await profilePost(info);

        if (response.data.isSuccessful) {
            localStorage.setItem("profileExists", true);
            setProfileExists(true);
            navigate('/home')
        } else {
            alert("Something went wrong, please try again.")
        }
    };

    switch(state.step) {
        case 0:
            return (
                showLoader
                    ? <Loader loaderStyling={loaderStyling} />
                    : <PersonalDetails
                        nextStep={(nextStep)}
                        handleChange={(handleChange)}
                        state={(state)}
                    />
            );

        case 1:
            return (
                <MailingAddress
                    prevStep={(prevStep)}
                    nextStep={(nextStep)}
                    handleChange={(handleChange)}
                    state={(state)}
                />
            );

        case 2:
            return (
                <BillingAddress
                    prevStep={(prevStep)}
                    nextStep={(nextStep)}
                    handleChange={(handleChange)}
                    state={(state)}
                    setState = {(setState)}
                />
            );
        
        case 3:
            return (
                <Preferences
                    prevStep={(prevStep)}
                    handleChange={(handleChange)}
                    handleSubmit={(handleSubmit)}
                    state={(state)}
                />
            );

        default:
    }
}