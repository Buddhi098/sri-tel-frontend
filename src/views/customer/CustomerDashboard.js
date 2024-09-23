import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, Paper } from "@mui/material";

import "../../css/customer/CustomerDashboard.css";
import "../../css/customer/customerpackages.css";
import StripeCard from "../../componets/StripeCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { Axios_user } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";

const currentBill = {
  issue_date: "2024-09-20",
  amount: "$500",
  due_date: "2024-09-30",
  services: [
    { name: "Data Plan", cost: "$200" },
    { name: "Voice Plan", cost: "$150" },
    { name: "SMS Plan", cost: "$50" },
    { name: "Additional Charges", cost: "$100" },
  ],
  payment_status: 0,
};

const pastPayments = [
  { issue_date: "2024-08-15", amount: "$250", payment_status: 1 },
  { issue_date: "2024-07-05", amount: "$350", payment_status: 1 },
];

export default function CustomerDashboard() {
  const userid = useSelector((state) => state.UserReducer.userid);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState("All");
  const [packages, setPackages] = useState([]);
  const [amount, setAmount] = useState(currentBill.amount);
  const [id, setId] = useState(currentBill.issue_date);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    setPackages(pastPayments);
  }, [userid]);

  const [total, setTotal] = useState();
  useEffect(() => {
    const getBills = async () => {
      const user_id = localStorage.getItem("user_id");
      const res = await Axios_user.post(API_ENDPOINTS.GET_TOTAL_PAID, {
        user_id,
      });
      console.log(res);
      setBills(res.data.result);
    };

    getBills();
  }, []);

  useEffect(() => {
    const getTotal = async () => {
      const user_id = localStorage.getItem("user_id");
      const res = await Axios_user.post(API_ENDPOINTS.GET_TOTAL_PAID, {
        user_id,
      });
      console.log(res.data.totalPrice);
      setTotal(res.data.totalPrice);
    };
    getTotal();
  }, []);

  const [history , setHistory] = useState([])
  useEffect(() => {
    const getTotal = async () => {
      const user_id = localStorage.getItem("user_id");
      const res = await Axios_user.post(API_ENDPOINTS.GET_PAYMENT_HISTORY, {
        user_id,
      });
      
      setHistory(res.data.history);
    };
    getTotal();
  }, []);

  const delete_package = async (event, package_id) => {
    event.preventDefault();
    try {
      const user_id = localStorage.getItem("user_id");

      const res = await Axios_user.post(API_ENDPOINTS.DELETE_PACKAGE, {user_id, package_id });

      if (res.data.type === 'success') 
      {
        console.log(res);
        // setTimeout(() => {window.location.href = 'http://localhost:3000/bill';}, 1000);
        window.location.href = 'http://localhost:3000/bill';
      } 
      else 
      {
        console.error("Error deleting package", res.data);
      }
    } catch (error) {
      console.error("Error occurred while deleting package:", error);
    }
  };

  const openModal = (id, amount) => {
    setId(id);
    setAmount(amount);
    setIsModalVisible(!isModalVisible);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: "background.paper",
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
          {bills.map((service, index) => (
            <div key={index} className="serviceItem">
              <span>{service.package_name}</span>
              <span>{service.price}</span>
              <span>{<Button onClick={(event)=> delete_package(event, service.package_id)}>remove</Button>}</span>
            </div>
          ))}
        </div>

        <Typography variant="h6" className="totalAmount">
          Total Amount: {total}
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
              <th>Id</th>
              <th>Amount(LKR.)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              history.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.amount}</td>
                <td>Paid</td>
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
