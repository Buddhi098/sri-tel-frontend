import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import '../../css/customer/customerpackages.css';
import StripeCard from '../../componets/StripeCard';
import { useSelector } from 'react-redux';

const data = [
    { "issue_date": "2024-09-20", "amount": "$500", "payment_status": 1 },
    { "issue_date": "2024-08-15", "amount": "$250", "payment_status": 0 },
    { "issue_date": "2024-07-05", "amount": "$350", "payment_status": 1 }
];

export default function CustomerDashboard() {
    const userid = useSelector((state) => state.UserReducer.userid);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checked, setChecked] = useState('All');
    const [packages, setPackages] = useState('');
    const [allPackages, setAllPackages] = useState('');
    const [amount, setAmount] = useState();
    const [id, setId] = useState();
    
    const package_names = [
        { name: 'Pending' },
        { name: 'Paid' }
    ];

    useEffect(() => {
        setPackages(data);
        setAllPackages(data);
    }, [userid]);

    const handleSubmit = (name) => {
        if (name === 'Pending') {
            const newArr = allPackages.filter(item => item.payment_status === 0);
            setPackages(newArr);
        } else if (name === 'Paid') {
            const newArr = allPackages.filter(item => item.payment_status === 1);
            setPackages(newArr);
        }
        setChecked(name);
    };

    const openModal = (id, price) => {
        setId(id);
        setAmount(price);
        setIsModalVisible(!isModalVisible);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="packageContainer">
            <div className="radioButtonRow">
                {package_names.map((item) => (
                    <div
                        key={item.name}
                        className="RadioButton"
                        style={checked === item.name ? { backgroundColor: '#5E239D' } : { backgroundColor: '#8a2be2' }}
                        onClick={() => handleSubmit(item.name)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            <div className="adminPackagesBottomRow">
                <table className="admin-styled-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages && packages.map((item, index) => (
                            <tr key={index}>
                                <td>{item.issue_date}</td>
                                <td>{item.amount}</td>
                                <td>{item.payment_status === 0 ? 'Not Paid' : 'Paid'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                open={isModalVisible}
                onClose={() => setIsModalVisible(!isModalVisible)}
            >
                <Box sx={style}>
                    <div className="modal-container">
                        <div className="processingtext">
                            Processing <span className="rstext">RS.{amount}</span>
                        </div>
                        <StripeCard amount={amount} id={id} />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
