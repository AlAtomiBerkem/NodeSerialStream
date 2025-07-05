import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3300/api/users')
            .then(response => {
                console.log(response.data); // Проверь данные!
                setUsers(response.data);
            })
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return (
        <div>
            <h1>Список пользователей</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name}</li> // Используй _id или другой уникальный ключ
                ))}
            </ul>
        </div>
    );
}

export default App;
