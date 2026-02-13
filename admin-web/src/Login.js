import React, { useState } from "react";

export default function Login({ setLoggedIn }) {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (username === "admin_test" && password === "admin123") {

      setLoggedIn(true);

    } else {

      alert("Invalid credentials");

    }

  };

  return (

    <div style={{ padding: 20 }}>

      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}
