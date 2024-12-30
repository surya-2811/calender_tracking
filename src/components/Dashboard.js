import React, { useState } from 'react';

const Dashboard = () => {
  const [companies, setCompanies] = useState([
    {
      name: 'Company A',
      lastCommunications: [
        { type: 'Email', date: '2024-12-01' },
        { type: 'LinkedIn Message', date: '2024-11-28' },
      ],
      nextCommunication: { type: 'Phone Call', date: '2024-12-10' },
      status: 'due', // 'due', 'overdue', or 'completed'
    },
  ]);

  const getRowClass = (status) => {
    if (status === 'overdue') return 'row-red';
    if (status === 'due') return 'row-yellow';
    return '';
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index} className={getRowClass(company.status)}>
              <td>{company.name}</td>
              <td>
                {company.lastCommunications.map((comm, idx) => (
                  <div key={idx}>
                    {comm.type} - {comm.date}
                  </div>
                ))}
              </td>
              <td>
                {company.nextCommunication.type} - {company.nextCommunication.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;