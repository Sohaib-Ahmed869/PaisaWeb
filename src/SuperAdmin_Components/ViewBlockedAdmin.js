import React, { useState, useEffect } from 'react';

const BlockedAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const apiUrl = 'http://127.0.0.1:3001/SuperAdmin/viewBlockedAdmins'; // Replace with your actual API endpoint

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the data to the console
        setAdmins(data.admins);
      } catch (error) {
        console.error('Error fetching blocked admins:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Blocked Admins</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>{admin.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default BlockedAdmins;