import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import '../../css/customer/customerpackages.css';
import PackageCard from '../../componets/PackageCard';
import { Axios_packages, Axios_bill } from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import StripeCard from '../../componets/StripeCard';
import { useSelector } from 'react-redux';

const dummyPackages = [
    {
        package_id: 1,
        name: "Basic Package",
        description: "This package includes basic data and voice services.",
        data_limit: "5GB",
        voice_limit: "100 minutes",
        sms_limit: "50 SMS",
        price: "$10",
        type: "data",
    },
    {
        package_id: 2,
        name: "Premium Package",
        description: "Premium package with more data and voice.",
        data_limit: "20GB",
        voice_limit: "500 minutes",
        sms_limit: "200 SMS",
        price: "$30",
        type: "voice",
    },
    {
        package_id: 3,
        name: "Unlimited Package",
        description: "Unlimited data, voice, and SMS.",
        data_limit: null,
        voice_limit: null,
        sms_limit: null,
        price: "$50",
        type: "data",
    },
    {
        package_id: 4,
        name: "Data Only Package",
        description: "Data-only package with no voice or SMS.",
        data_limit: "50GB",
        voice_limit: null,
        sms_limit: null,
        price: "$20",
        type: "data",
    },
    {
        package_id: 5,
        name: "Voice Only Package",
        description: "Voice-only package with no data or SMS.",
        data_limit: null,
        voice_limit: "1000 minutes",
        sms_limit: null,
        price: "$15",
        type: "voice",
    }
];

export default function CustomerPackages() {
    const userid = useSelector((state) => state.UserReducer.userid);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checked, setChecked] = useState('All');
    const [packages, setPackages] = useState('');
    const [allPackages, setAllPackages] = useState('');
    const [amount, setAmount] = useState();
    const [id, setId] = useState();
    const package_names = [
        { name: 'All' },
        { name: 'Data' },
        { name: 'Voice' }
    ];

    useEffect(() => {
        setPackages(dummyPackages);
        setAllPackages(dummyPackages);
    }, []);

    const activate = () => {
        console.log('Activate Package');
    };

    const handleSubmit = (name) => {
        if (name === 'All') {
            setPackages(allPackages);
        } else if (name === 'Data') {
            const newArr = allPackages.filter((item) => item.type === 'data');
            setPackages(newArr);
        } else if (name === 'Voice') {
            const newArr = allPackages.filter((item) => item.type === 'voice');
            setPackages(newArr);
        }
        setChecked(name);
    };

    const openModal = (id, price) => {
        setId(id);
        setAmount(price);
        setIsModalVisible(!isModalVisible);
    };

    const addToBill = (id, price) => {
        // API integration code goes here
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // bgcolor: 'background.paper',
        // boxShadow: 24,
        p: 4,
    };

    return (
        <div className='page-container'>
            {/* Page Title */}
            <div className='header'>
                <h1>Telecom User Package Details</h1>
                <p>Choose and manage your telecom packages with ease</p>
            </div>

            {/* Filter Radio Buttons */}
            <div className='radioButtonRow'>
                {package_names.map((item) => (
                    <div
                        key={item.name}
                        style={checked === item.name ? { backgroundColor: '#5E239D' } : { backgroundColor: '#8a2be2' }}
                        className='RadioButton'
                        onClick={() => handleSubmit(item.name)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>

            {/* Package Table */}
            <div className='packageContainer'>
                <div className='adminPackagesBottomRow'>
                    <table className='admin-styled-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Data limit</th>
                                <th>Voice limit</th>
                                <th>SMS limit</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages &&
                                packages.map((item) => (
                                    <tr key={item.package_id}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.data_limit ? item.data_limit : '-'}</td>
                                        <td>{item.voice_limit ? item.voice_limit : '-'}</td>
                                        <td>{item.sms_limit ? item.sms_limit : '-'}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <div onClick={() => openModal(item.package_id, item.price)} className='packageBuyButton'>
                                                Activate
                                            </div>
                                        </td>
                                        <td>
                                            <div onClick={() => addToBill(item.package_id, item.price)} className='packageBuyButton' style={{ backgroundColor: 'tomato' }}>
                                                Add to bill
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for Payment */}
                <Modal onClose={() => setIsModalVisible(!isModalVisible)} open={isModalVisible} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
					<Box sx={style}>
						<div
							style={{
								backgroundColor: 'white',
								width: '40vw',
								height: '17vw',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<div className='processingtext'>
								Processing <span className='rstext'>RS.{amount}</span>
							</div>
							<StripeCard amount={amount} id={id} />
						</div>
					</Box>
				</Modal>
            </div>
        </div>
    );
}
