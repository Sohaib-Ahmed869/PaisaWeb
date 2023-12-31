import React, { useState } from 'react';
import Footer from '../layout/footer';

const url = process.env.REACT_APP_BACKEND_URL
const blockAdminApiUrl = `${url}/SuperAdmin/blockAdmin`;
const unblockAdminApiUrl = `${url}/SuperAdmin/unblockAdmin`;

const BlockUnblock = () => {
    console.log(blockAdminApiUrl);
  const [blockEmail, setBlockEmail] = useState('');
  const [unblockEmail, setUnblockEmail] = useState('');
  const [blockMessage, setBlockMessage] = useState('');
  const [unblockMessage, setUnblockMessage] = useState('');

  const handleBlockEmailChange = (e) => {
    setBlockEmail(e.target.value);
  };

  const handleUnblockEmailChange = (e) => {
    setUnblockEmail(e.target.value);
  };

  const handleBlockSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(blockAdminApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: blockEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setBlockMessage(data.message);
      } else {
        setBlockMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setBlockMessage('Internal server error');
    }
  };

  const handleUnblockSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(unblockAdminApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: unblockEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setUnblockMessage(data.message);
      } else {
        setUnblockMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setUnblockMessage('Internal server error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Block Admin Form */}
        <div className="col-md-6">
          <h3>Block Admin</h3>
          <form onSubmit={handleBlockSubmit}>
            <div className="mb-3">
              <label htmlFor="blockEmail" className="form-label">Admin Email:</label>
              <input type="email" className="form-control" id="blockEmail" value={blockEmail} onChange={handleBlockEmailChange} required />
            </div>
            <button type="submit" className="btn btn-danger">Block Admin</button>
          </form>
          {blockMessage && <p className="mt-3 text-danger">{blockMessage}</p>}
        </div>

        {/* Unblock Admin Form */}
        <div className="col-md-6">
          <h3>Unblock Admin</h3>
          <form onSubmit={handleUnblockSubmit}>
            <div className="mb-3">
              <label htmlFor="unblockEmail" className="form-label">Admin Email:</label>
              <input type="email" className="form-control" id="unblockEmail" value={unblockEmail} onChange={handleUnblockEmailChange} required />
            </div>
            <button type="submit" className="btn btn-success">Unblock Admin</button>
          </form>
          {unblockMessage && <p className="mt-3 text-success">{unblockMessage}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlockUnblock;