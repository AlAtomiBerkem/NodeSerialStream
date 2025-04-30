import { useEffect, useState } from "react";
import SerialPort from "./components/SerialPort";
import GetUsers from "./components/GetUsers/getUsers";

function App() {
    const [users, setUsers] = useState([])
    const [portData, setPortData] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => {
                console.log(data);  
                setUsers(data); 
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSerialData = (data) => {
        setPortData(prevdata => [...prevdata, data])
    }


  console.log(portData)

    return (
        <div className="app">
            <SerialPort onSerialData={handleSerialData }/>
            <GetUsers users={users} />
        </div>
    );
}

export default App;