import React, { useState } from 'react';

const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: 'LinkedIn Post', mandatory: true },
    { name: 'LinkedIn Message', mandatory: true },
    { name: 'Email', mandatory: true },
    { name: 'Phone Call', mandatory: false },
    { name: 'Other', mandatory: false },
  ]);

  return (
    <div className="admin">
      <h1>Admin Module</h1>
      <div>
        <h2>Manage Companies</h2>
        {/* Add Form and Table to handle company management */}
      </div>
      <div>
        <h2>Manage Communication Methods</h2>
        {/* Add Form and Table to handle communication methods */}
      </div>
    </div>
  );
};

export default Admin;
