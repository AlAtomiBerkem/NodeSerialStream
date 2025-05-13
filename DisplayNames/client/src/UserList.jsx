import React, { useEffect, useState } from 'react';
import './style.css'

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://10.0.0.128:3001/api/users/';

    const fetchData = () => {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка сети');
          }
          return response.json();
        })
        .then(data => {
          setUsers(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Ошибка:', error);
          setLoading(false);
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className='users-names'>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.UserName}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
