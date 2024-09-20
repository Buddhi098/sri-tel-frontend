import React, { useEffect, useState } from 'react';
import '../../css/admin/admin.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Axios_packages } from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';

export default function AdminPackages() {
  const [details, setDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dataLimit, setDataLimit] = useState('');
  const [voiceLimit, setVoiceLimit] = useState('');
  const [smsLimit, setSmsLimit] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('all');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '45vw',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
  };

  // Handle form submission
  const handleSubmit = () => {
    Axios_packages.post(API_ENDPOINTS.ADD_PACKAGE_URL, {
      name,
      description,
      data: dataLimit,
      voice: voiceLimit,
      sms: smsLimit,
      type,
      price,
    }).then(() => {
      // Clear the form after submission
      closeModal();
    });
  };

  // Close the modal and reset form values
  const closeModal = () => {
    setIsModalVisible(false);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setDataLimit('');
    setVoiceLimit('');
    setSmsLimit('');
    setPrice('');
    setType('all');
  };

  // Fetch package details when the component mounts
//   useEffect(() => {
//     async function getPackageDetails() {
//       const res = await Axios_packages.get(API_ENDPOINTS.GET_PACKAGE_URL);
//       setDetails(res.data);
//     }
//     getPackageDetails();
//   }, []);

  // Handle option change
  const setOption = (value) => {
    if (value === 'data') {
      setVoiceLimit('');
      setSmsLimit('');
    } else if (value === 'voice') {
      setDataLimit('');
    }
    setType(value);
  };

  return (
    <div
      className="adminPackages"
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
    >
        <header className='admin-header'>
          <h1>Sri Tel Ltd (STL) - Package Management</h1>
          <p>Manage your packages efficiently with our state-of-the-art system.</p>
        </header>
      <div
        className="adminPackagesTopRow"
        style={{
          width: '90%',
          height: '12%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div className="adminPackageAddButton" onClick={() => setIsModalVisible(true)}>
          Add a package
        </div>
      </div>
      
      <Modal onClose={closeModal} open={isModalVisible}>
        <Box sx={style}>
          <div
            style={{
              backgroundColor: 'white',
              width: '40vw',
              height: '40vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="addNewPackageTitle" style={{ display: 'flex', height: '7%', alignItems: 'center', justifyContent: 'center' }}>
              Add new package
            </div>

            {/* Form Fields */}
            <div className="adminPackagerow">
              <input
                placeholder="Name*"
                className="adminPackageInput"
                type="text"
                onChange={(event) => setName(event.target.value)}
                value={name}
                required
              />
            </div>
            <div className="adminPackagerow">
              <textarea
                className="packageDescriptionInput"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                placeholder="Description*"
                rows={4}
                cols={40}
              />
            </div>

            {/* Radio Buttons */}
            <div className="adminPackagerow" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
              <div className="signUpRadioItem">
                <input type="radio" value="all" checked={type === 'all'} onChange={(event) => setOption(event.target.value)} />
                <label>All</label>
              </div>
              <div className="signUpRadioItem">
                <input type="radio" value="data" checked={type === 'data'} onChange={(event) => setOption(event.target.value)} />
                <label>Data</label>
              </div>
              <div className="signUpRadioItem">
                <input type="radio" value="voice" checked={type === 'voice'} onChange={(event) => setOption(event.target.value)} />
                <label>Voice</label>
              </div>
            </div>

            {/* Package Inputs */}
            <div className="adminPackagerow" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '92%' }}>
              <input
                disabled={type === 'voice'}
                placeholder="Data limit*"
                className="adminPackageInput"
                type="text"
                onChange={(event) => setDataLimit(event.target.value)}
                value={dataLimit}
              />
              <input
                disabled={type === 'data'}
                placeholder="Voice limit"
                className="adminPackageInput"
                type="text"
                onChange={(event) => setVoiceLimit(event.target.value)}
                value={voiceLimit}
              />
              <input
                disabled={type === 'data'}
                placeholder="SMS limit"
                className="adminPackageInput"
                type="text"
                onChange={(event) => setSmsLimit(event.target.value)}
                value={smsLimit}
              />
            </div>
            <div className="adminPackagerow" style={{ marginTop: '-3%' }}>
              <input
                placeholder="Price*"
                className="adminPackageInput"
                type="number"
                onChange={(event) => setPrice(event.target.value)}
                value={price}
                required
              />
            </div>

            <div className="adminPackageAddButton" style={{height: '8%', width: '20%', color: 'white'}} onClick={handleSubmit}>
              Add
            </div>
          </div>
        </Box>
      </Modal>

      {/* Package Table */}
      <div className="adminPackagesBottomRow" style={{ width: '90%', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}>
        <table className="admin-styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Data limit</th>
              <th>Voice limit</th>
              <th>SMS limit</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d) => (
              <tr key={d.package_id}>
                <td>{d.name}</td>
                <td>{d.description}</td>
                <td>{d.data_limit === null ? '-' : d.data_limit}</td>
                <td>{d.voice_limit === null ? '-' : d.voice_limit}</td>
                <td>{d.sms_limit === null ? '-' : d.sms_limit}</td>
                <td>{d.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
