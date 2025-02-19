import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/app1/register/', formData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error.response?.data || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerBox}>
        <h2 style={styles.heading}>Register</h2>

        <form onSubmit={handleSubmit}>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.label}>Username:</td>
                <td>
                  <input 
                    type="text" 
                    name="username" 
                    style={styles.input} 
                    onChange={handleChange} 
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.label}>Email:</td>
                <td>
                  <input 
                    type="email" 
                    name="email" 
                    style={styles.input} 
                    onChange={handleChange} 
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.label}>Password:</td>
                <td>
                  <input 
                    type="password" 
                    name="password" 
                    style={styles.input} 
                    onChange={handleChange} 
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.label}>Confirm Password:</td>
                <td>
                  <input 
                    type="password" 
                    name="password2" 
                    style={styles.input} 
                    onChange={handleChange} 
                    required 
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit" style={styles.button}>Register</button>
        </form>

        <p style={styles.loginText}>
          Already have an account?  
          <button 
            type="button" 
            style={styles.loginButton} 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

// Internal CSS
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'black',
  },
  registerBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    width: '350px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'black',
  },
  table: {
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    textAlign: 'right',
    paddingRight: '10px',
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid black',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  loginText: {
    marginTop: '15px',
    fontSize: '14px',
    color: 'black',
  },
  loginButton: {
    background: 'none',
    border: 'none',
    color: 'blue',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '5px',
  }
};

export default Register;
