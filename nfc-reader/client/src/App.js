import { useEffect, useState } from "react";
import SerialPort from "./components/SerialPort";
import GetUsers from "./components/GetUsers/getUsers";

function App() {
    const [users, setUsers] = useState([]);
    const [portData, setPortData] = useState([]);

    useEffect(() => {
        const lastData = portData[portData.length - 1];
        const cleanId = lastData ? lastData.replace(/\D+/g, '') : null;

        if (cleanId) {
            fetch(`http://localhost:3001/api/users/${cleanId}`)
                .then(response => response.json())
                .then(data => {
                    setUsers(Array.isArray(data) ? data : [data]);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [portData]);

    const handleSerialData = (data) => {
        setPortData(prevData => [...prevData, data]);
    };

    console.log(portData);

    return (
        <div className="app">
            <SerialPort onSerialData={handleSerialData} />
            <GetUsers users={users} />
        </div>
    );
}

export default App;