import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Paper } from '@mui/material';

import '../../css/customer/CustomerDashboard.css';
import '../../css/customer/customerpackages.css';
import StripeCard from '../../componets/StripeCard';
import { useSelector } from 'react-redux';

const currentBill = {
  issue_date: "2024-09-20",
  amount: "$500",
  due_date: "2024-09-30",
  services: [
    { name: "Data Plan", cost: "$200" },
    { name: "Voice Plan", cost: "$150" },
    { name: "SMS Plan", cost: "$50" },
    { name: "Additional Charges", cost: "$100" }
  ],
  payment_status: 0
};

const pastPayments = [
  { issue_date: "2024-08-15", amount: "$250", payment_status: 1 },
  { issue_date: "2024-07-05", amount: "$350", payment_status: 1 }
];

export default function CustomerDashboard() {
  const userid = useSelector((state) => state.UserReducer.userid);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState('All');
  const [packages, setPackages] = useState([]);
  const [amount, setAmount] = useState(currentBill.amount);
  const [id, setId] = useState(currentBill.issue_date);

  useEffect(() => {
    setPackages(pastPayments);
  }, [userid]);

  const openModal = (id, amount) => {
    setId(id);
    setAmount(amount);
    setIsModalVisible(!isModalVisible);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="dashboardContainer">
      <Typography variant="h4" className="dashboardTitle">
        Customer Dashboard
      </Typography>
      <Typography variant="subtitle1" className="dashboardSubtitle">
        Manage your billing and view payment history
      </Typography>

      {/* Current Bill Section */}
      <Paper elevation={3} className="currentBillSection">
        <Typography variant="h5" className="sectionTitle">
          Current Bill
        </Typography>
        <Typography variant="body1">
          Issue Date: {currentBill.issue_date}
        </Typography>
        <Typography variant="body1">
          Due Date: {currentBill.due_date}
        </Typography>

        {/* Bill breakdown */}
        <div className="billBreakdown">
          {currentBill.services.map((service, index) => (
            <div key={index} className="serviceItem">
              <span>{service.name}</span>
              <span>{service.cost}</span>
            </div>
          ))}
        </div>

        <Typography variant="h6" className="totalAmount">
          Total Amount: {currentBill.amount}
        </Typography>

        {/* Pay button */}
        <Button
          variant="contained"
          color="primary"
          className="payButton"
          onClick={() => openModal(currentBill.issue_date, currentBill.amount)}
          disabled={currentBill.payment_status === 1}
        >
          {currentBill.payment_status === 1 ? "Paid" : "Pay Now"}
        </Button>
      </Paper>

      {/* Payment History Section */}
      <Typography variant="h5" className="sectionTitle">
          Payment History
        </Typography>
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
            {packages.map((item, index) => (
              <tr key={index}>
                <td>{item.issue_date}</td>
                <td>{item.amount}</td>
                <td>{item.payment_status === 1 ? 'Paid' : 'Not Paid'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Stripe Payment */}
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
