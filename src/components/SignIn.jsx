import React from "react";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [error] = React.useState(null);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  

  return (
    <div className="form-container sign-in-container">
        <h1>Login</h1>
        
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <a href="/usuario">Women</a>
        
    </div>
  );
}

export default SignInForm;
