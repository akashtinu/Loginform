import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${API_URL}/login`
      : `${API_URL}/register`;

    const formData = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success && isLogin) {
        setLoggedUser(data.name);
        clearForm();
        return;
      }

      if (data.success && !isLogin) {
        setMessage(data.message);
        setMessageType("success");
        setIsLogin(true);
        clearForm();
        return;
      }

      setMessage(data.message);
      setMessageType("error");
    } catch (error) {
      setMessage("Backend connection failed");
      setMessageType("error");
    }
  };

  if (loggedUser) {
    return (
      <div style={{ width: "400px", margin: "100px auto", fontFamily: "Arial" }}>
        <h1>Welcome {loggedUser}</h1>
        <p>You logged in successfully.</p>

        <button onClick={() => setLoggedUser(null)}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: "350px", margin: "80px auto", fontFamily: "Arial" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            color: messageType === "success" ? "green" : "red",
            background: messageType === "success" ? "#e8ffe8" : "#ffe8e8"
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={submitForm}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
          clearForm();
        }}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
        {isLogin ? "Create Account" : "Already have account? Login"}
      </button>
    </div>
  );
}

export default App;