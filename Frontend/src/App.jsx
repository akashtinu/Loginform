import { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

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
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    const formData = isLogin
      ? { email, password }
      : { name, email, password };

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
      alert("Register successful. Now login.");
      setIsLogin(true);
      clearForm();
      return;
    }

    alert(data.message);
  };

  if (loggedUser) {
    return (
      <div style={{ width: "400px", margin: "100px auto", fontFamily: "Arial" }}>
        
        <h1>Welcome {loggedUser}</h1>
        <p>You logged in successfully.</p>

        <button
        className="lagout-btn"
        
         onClick={() => setLoggedUser(null)}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: "350px", margin: "80px auto", fontFamily: "Arial" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

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

        <button 
        className="login-but"
        type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button 
      className="create-but"
        onClick={() => {
          setIsLogin(!isLogin);
          clearForm();
        }}
        style={{  marginTop: "10px" }}
      >
        {isLogin ? "Create Account" : "Already have account? Login"}
      </button>
    </div>
  );
}

export default App;