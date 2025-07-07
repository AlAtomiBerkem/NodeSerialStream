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


                {users.map(user => (
                    <p key={user._id}>{user.UserName || ''}</p>
                ))}

        </div>
    );
}

export default App;
