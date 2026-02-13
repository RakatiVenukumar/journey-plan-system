import React, { useState } from "react";

export default function Dashboard() {

  const [customer, setCustomer] = useState("");

  const [customers, setCustomers] = useState([]);

  const addCustomer = () => {

    if (customer === "") return;

    setCustomers([...customers, customer]);

    setCustomer("");

  };

  const saveJP = () => {

    const jp = {

      date: new Date().toDateString(),

      customers: customers

    };

    localStorage.setItem("journeyPlan", JSON.stringify(jp));

    alert("Journey Plan Saved Successfully");

  };

  return (

    <div style={{ padding: 20 }}>

      <h2>Create Journey Plan</h2>

      <input
        placeholder="Enter customer name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      <button onClick={addCustomer}>
        Add Customer
      </button>

      <h3>Customer List:</h3>

      <ul>

        {

          customers.map((c, index) => (

            <li key={index}>{c}</li>

          ))

        }

      </ul>

      <button onClick={saveJP}>
        Save Journey Plan
      </button>

    </div>

  );

}
