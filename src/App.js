import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css'; // Импорт CSS файла

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4444/users')
      .then(resp => setUsers(resp.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/user', JSON.stringify(formData));
      if (response.status === 200) {
        fetchUsers();
        setShowForm(false);
        setFormData({ username: '', email: '' });
      } else {
        alert('Error adding user:' + response.statusText);
      }
    } catch (error) {
      alert('Error adding user:' + error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my Pet Project</h1>
      </header>
      <main>
        <h2>Users</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setShowForm(true)}>Добавить нового пользователя</button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <button type="submit">Принять</button>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
