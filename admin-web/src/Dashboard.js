import React, { useState, useEffect } from "react";

export default function Dashboard() {

  const [routeName, setRouteName] = useState("");
  const [routeCode, setRouteCode] = useState("");
  const [validFrom, setValidFrom] = useState("");

  const [storeName, setStoreName] = useState("");
  const [storeCode, setStoreCode] = useState("");

  const [stores, setStores] = useState([]);

  useEffect(() => {

    const savedJP = localStorage.getItem("journeyPlan");

    if (savedJP) {

      const parsed = JSON.parse(savedJP);

      setStores(parsed.customers || []);

    }

  }, []);

  const addStore = () => {

    const name = storeName.trim();
    const code = storeCode.trim();

    if (!name || !code)
      return alert("Enter store name and code");

    if (
      stores.some(
        s =>
          s.code.toLowerCase() ===
          code.toLowerCase()
      )
    )
      return alert("Duplicate store code");

    if (stores.length >= 10)
      return alert("Maximum 10 stores allowed");

    setStores([
      ...stores,
      { name, code }
    ]);

    setStoreName("");
    setStoreCode("");

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
      !routeName.trim() ||
      !routeCode.trim() ||
      !validFrom
    )
      return alert(
        "Fill route information"
      );

    if (stores.length === 0)
      return alert(
        "Add at least one store"
      );

    const jp = {
      routeName,
      routeCode,
      validFrom,
      customers: stores
    };

    localStorage.setItem(
      "journeyPlan",
      JSON.stringify(jp)
    );

    alert(
      "Journey Plan Created Successfully"
    );

  };

  return (

    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>

        <h2>
          Journey Plan Management
        </h2>

        <p style={styles.subtitle}>
          Create and assign daily store visits
        </p>

      </div>

      {/* Route Card */}
      <div style={styles.card}>

        <h3 style={styles.cardTitle}>
          Route Information
        </h3>

        <div style={styles.grid}>

          <input
            style={styles.input}
            placeholder="Route Name"
            value={routeName}
            onChange={e =>
              setRouteName(
                e.target.value
              )
            }
          />

          <input
            style={styles.input}
            placeholder="Route Code"
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

        </div>

      </div>

      {/* Store Card */}
      <div style={styles.card}>

        <h3 style={styles.cardTitle}>
          Stores ({stores.length}/10)
        </h3>

        <div style={styles.grid}>

          <input
            style={styles.input}
            placeholder="Store Name"
            value={storeName}
            onChange={e =>
              setStoreName(
                e.target.value
              )
            }
          />

          <input
            style={styles.input}
            placeholder="Store Code"
            value={storeCode}
            onChange={e =>
              setStoreCode(
                e.target.value
              )
            }
          />

        </div>

        <button
          style={styles.primaryButton}
          onClick={addStore}
        >
          Add Store
        </button>

        {/* Store List */}

        <div style={styles.list}>

          {

            stores.length === 0 ?

            <p style={styles.empty}>
              No stores added
            </p>

            :

            stores.map(store => (

              <div
                key={store.code}
                style={styles.listItem}
              >

                <div>

                  <strong>
                    {store.name}
                  </strong>

                  <div style={styles.code}>
                    {store.code}
                  </div>

                </div>

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

      </div>

      {/* Save */}

      <button
        style={styles.saveButton}
        onClick={saveJourneyPlan}
      >
        Save Journey Plan
      </button>

    </div>

  );

}

const styles = {

  page: {
    padding: "40px",
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  header: {
    marginBottom: "20px"
  },

  subtitle: {
    color: "#64748b"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow:
      "0 5px 15px rgba(0,0,0,0.05)"
  },

  cardTitle: {
    marginBottom: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1"
  },

  primaryButton: {
    marginTop: "10px",
    background: "#2563eb",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px"
  },

  saveButton: {
    width: "100%",
    padding: "14px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold"
  },

  list: {
    marginTop: "15px"
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom:
      "1px solid #e2e8f0"
  },

  remove: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px"
  },

  code: {
    fontSize: "12px",
    color: "#64748b"
  },

  empty: {
    color: "#64748b"
  }

};
