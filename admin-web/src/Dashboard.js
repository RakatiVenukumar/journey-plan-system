import React, { useState, useEffect } from "react";

export default function Dashboard({ onLogout }) {

  const [routeName, setRouteName] = useState("");
  const [routeCode, setRouteCode] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  const [storeName, setStoreName] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [storeAddress, setStoreAddress] = useState("");

  const [stores, setStores] = useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    visited: 0,
    missed: 0
  });


  useEffect(() => {

    calculateSummary();

  }, [stores]);


  const calculateSummary = () => {

    const total = stores.length;

    const pending =
      stores.filter(
        s => s.status === "Pending"
      ).length;

    const visited =
      stores.filter(
        s => s.status === "Visited"
      ).length;

    const missed =
      stores.filter(
        s => s.status === "Missed"
      ).length;

    setSummary({
      total,
      pending,
      visited,
      missed
    });

  };


  const addStore = () => {

    if (!storeName || !storeCode || !storeAddress)
      return alert("Fill all fields");

    if (
      stores.some(
        s => s.code === storeCode
      )
    )
      return alert("Duplicate store");

    const newStore = {
      name: storeName,
      code: storeCode,
      address: storeAddress,
      status: "Pending"
    };

    setStores([
      ...stores,
      newStore
    ]);

    setStoreName("");
    setStoreCode("");
    setStoreAddress("");

  };


  const removeStore = code => {

    setStores(
      stores.filter(
        s => s.code !== code
      )
    );

  };


  const saveJourneyPlan = () => {

    if (
      !routeName ||
      !routeCode ||
      !validFrom ||
      !validTo ||
      !assignedUser
    )
      return alert("Fill all route info");

    if (stores.length === 0)
      return alert("Add stores");

    const newPlan = {

      routeName,
      routeCode,
      validFrom,
      validTo,
      assignedUser,
      customers: stores

    };

    let existing =
      localStorage.getItem(
        "journeyPlans"
      );

    existing =
      existing
        ? JSON.parse(existing)
        : [];

    existing.push(newPlan);

    localStorage.setItem(
      "journeyPlans",
      JSON.stringify(existing)
    );

    alert("Journey Plan Saved");

  };


  return (

    <div style={styles.page}>


      {/* HEADER */}

      <div style={styles.header}>

        <h2>
          Admin Dashboard
        </h2>

        <button
          style={styles.logout}
          onClick={onLogout}
        >
          Logout
        </button>

      </div>



      {/* SUMMARY */}

      <div style={styles.summaryGrid}>

        <div style={styles.card}>
          Total Stores
          <h3>{summary.total}</h3>
        </div>

        <div style={styles.card}>
          Pending
          <h3>{summary.pending}</h3>
        </div>

        <div style={styles.card}>
          Visited
          <h3>{summary.visited}</h3>
        </div>

        <div style={styles.card}>
          Missed
          <h3>{summary.missed}</h3>
        </div>

      </div>



      {/* ROUTE INFO */}

      <div style={styles.cardBox}>

        <h3>Route Info</h3>

        <input
          placeholder="Route Name"
          style={styles.input}
          value={routeName}
          onChange={e =>
            setRouteName(
              e.target.value
            )
          }
        />

        <input
          placeholder="Route Code"
          style={styles.input}
          value={routeCode}
          onChange={e =>
            setRouteCode(
              e.target.value
            )
          }
        />

        <input
          type="date"
          style={styles.input}
          value={validFrom}
          onChange={e =>
            setValidFrom(
              e.target.value
            )
          }
        />

        <input
          type="date"
          style={styles.input}
          value={validTo}
          onChange={e =>
            setValidTo(
              e.target.value
            )
          }
        />

        <select
          style={styles.input}
          value={assignedUser}
          onChange={e =>
            setAssignedUser(
              e.target.value
            )
          }
        >

          <option value="">
            Assign User
          </option>

          <option>
            vansales01
          </option>

          <option>
            vansales02
          </option>

          <option>
            vansales03
          </option>

          <option>
            vansales04
          </option>

        </select>

      </div>



      {/* STORE ADD */}

      <div style={styles.cardBox}>

        <h3>Add Store</h3>

        <input
          placeholder="Store Name"
          style={styles.input}
          value={storeName}
          onChange={e =>
            setStoreName(
              e.target.value
            )
          }
        />

        <input
          placeholder="Store Code"
          style={styles.input}
          value={storeCode}
          onChange={e =>
            setStoreCode(
              e.target.value
            )
          }
        />

        <input
          placeholder="Address"
          style={styles.input}
          value={storeAddress}
          onChange={e =>
            setStoreAddress(
              e.target.value
            )
          }
        />

        <button
          style={styles.add}
          onClick={addStore}
        >
          Add Store
        </button>

      </div>



      {/* STORE LIST */}

      <div style={styles.cardBox}>

        <h3>Store List</h3>

        {

          stores.map(store => (

            <div
              key={store.code}
              style={styles.storeRow}
            >

              {store.name}

              <button
                style={styles.remove}
                onClick={() =>
                  removeStore(
                    store.code
                  )
                }
              >
                Remove
              </button>

            </div>

          ))

        }

      </div>



      {/* SAVE */}

      <button
        style={styles.save}
        onClick={saveJourneyPlan}
      >
        Save Journey Plan
      </button>


    </div>

  );

}



const styles = {

  page:{
    padding:"30px",
    background:"#f1f5f9",
    minHeight:"100vh"
  },

  header:{
    display:"flex",
    justifyContent:"space-between",
    marginBottom:"20px"
  },

  logout:{
    background:"red",
    color:"#fff",
    padding:"10px"
  },

  summaryGrid:{
    display:"grid",
    gridTemplateColumns:"repeat(4,1fr)",
    gap:"10px",
    marginBottom:"20px"
  },

  card:{
    background:"#fff",
    padding:"20px",
    borderRadius:"10px"
  },

  cardBox:{
    background:"#fff",
    padding:"20px",
    marginBottom:"20px",
    borderRadius:"10px"
  },

  input:{
    display:"block",
    marginBottom:"10px",
    padding:"10px",
    width:"100%"
  },

  add:{
    background:"blue",
    color:"#fff",
    padding:"10px"
  },

  save:{
    background:"green",
    color:"#fff",
    padding:"15px",
    width:"100%"
  },

  storeRow:{
    display:"flex",
    justifyContent:"space-between",
    padding:"10px"
  },

  remove:{
    background:"red",
    color:"#fff"
  }

};
