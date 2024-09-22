import React, { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import "../../css/customer/customerpackages.css";
import PackageCard from "../../componets/PackageCard";
import { Axios_packages, Axios_bill, Axios_user } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";
import StripeCard from "../../componets/StripeCard";
import { useSelector } from "react-redux";

export default function CustomerPackages() {
  const userid = useSelector((state) => state.UserReducer.userid);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState("All");
  const [packages, setPackages] = useState("");
  const [allPackages, setAllPackages] = useState("");
  const [amount, setAmount] = useState();
  const [id, setId] = useState();
  const package_names = [
    { name: "Available Packages" },
    { name: "Activated Packages" },
  ];

  useEffect(() => {
    async function getPackageDetails() {
      const res = await Axios_packages.get(
        API_ENDPOINTS.GET_AVAILABLE_PACKAGES
      );
      setPackages(res.data.data);
      setAllPackages(res.data.data);
    }
    getPackageDetails();
  }, []);

  const activate = () => {
    console.log("Activate Package");
  };

  const getAvailablePackages = async () => {
    const res = await Axios_packages.get(API_ENDPOINTS.GET_AVAILABLE_PACKAGES);
    console.log(res.data.data);
    setPackages(res.data.data);
    setAllPackages(res.data.data);
    setChecked("Available Packages");
    setIsActivate(false);
  };

  const [isActivate, setIsActivate] = useState(false);

  const getActivatedPackages = async () => {
    let user_id = localStorage.getItem("user_id"); // Use getItem to retrieve data from localStorage
    try {
      const res = await Axios_packages.get(
        API_ENDPOINTS.GET_ACTIVATED_PACKAGES,
        {
          params: { user_id }, // Pass user_id as a query parameter
        }
      );
      setPackages(res.data.data);
      setAllPackages(res.data.data);
    } catch (error) {
      console.error("Error fetching activated packages:", error);
      // Handle the error as needed, e.g., show an error message
    }
    setIsActivate(true);
  };

  const handleSubmit = (name) => {
    if (name === "Available Packages") {
      getAvailablePackages();
    } else if (name === "Activated Packages") {
      getActivatedPackages();
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: 'background.paper',
    // boxShadow: 24,
    p: 4,
  };

  return (
    <div className="page-container">
      {/* Page Title */}
      <div className="header">
        <h1>Telecom User Package Details</h1>
        <p>Choose and manage your telecom packages with ease</p>
      </div>

      {/* Filter Radio Buttons */}
      <div className="radioButtonRow">
        {package_names.map((item) => (
          <div
            key={item.name}
            style={
              checked === item.name
                ? { backgroundColor: "#5E239D" }
                : { backgroundColor: "#8a2be2" }
            }
            className="RadioButton"
            onClick={() => handleSubmit(item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Package Table */}
      <div className="packageContainer">
        <div className="adminPackagesBottomRow">
          <table className="admin-styled-table">
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
                    <td>{item.data_limit ? item.data_limit : "-"}</td>
                    <td>{item.voice_limit ? item.voice_limit : "-"}</td>
                    <td>{item.sms_limit ? item.sms_limit : "-"}</td>
                    <td>{item.price}</td>
                    {!isActivate && (
                      <>
                        {" "}
                        <td>
                          <div
                            onClick={() => openModal(item.id, item.price)}
                            className="packageBuyButton"
                          >
                            Activate
                          </div>
                        </td>
                        <td>
                          <div
                            onClick={() => addToBill(item.id, item.price)}
                            className="packageBuyButton"
                            style={{ backgroundColor: "tomato" }}
                          >
                            Add to bill
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Payment */}
        <Modal
          onClose={() => setIsModalVisible(!isModalVisible)}
          open={isModalVisible}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                backgroundColor: "white",
                width: "40vw",
                height: "17vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="processingtext">
                Processing <span className="rstext">RS.{amount}</span>
              </div>
              <StripeCard amount={amount} id={id} />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
