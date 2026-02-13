import React, { useState } from "react";
import deliveryImage from "./assets/delivery.jpg";

export default function Login({ setLoggedIn }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      username.trim() === "admin_test" &&
      password === "admin123"
    ) {

      setLoggedIn(true);

    } else {

      alert("Invalid username or password");

    }

  };

  return (

    <div style={styles.container}>

      {/* Left side image */}
      <div style={styles.left}>

        <img
          src={deliveryImage}
          alt="delivery"
          style={styles.image}
        />

      </div>

      {/* Right side login */}
      <div style={styles.right}>

        <div style={styles.card}>

          <h2 style={styles.title}>
            Van Sales Admin Login
          </h2>

          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            style={styles.button}
            onClick={handleLogin}
          >
            Login
          </button>

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {
    display: "flex",
    height: "100vh"
  },

  left: {
  flex: 1,
  backgroundColor: "#f1f5f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "40px"
},

right: {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #eef2ff, #e0f2fe)"
},


  image: {
  width: "200%",
  height: "100%",
  objectFit: "contain"
},

card: {
  width: "320px",
  padding: "30px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  border: "1px solid #e2e8f0"
},


  title: {
    marginBottom: "20px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

button: {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px"
}


};
