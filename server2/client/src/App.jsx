import TestComponent from "./components/MainComponents.jsx";
import ConnectionTab from "./components/ConnectionTab.jsx";
import TestingDone from "./components/TestingDone.jsx"
import ErrorComponent from "./components/ErrorComponent.jsx"
import TestingStart from "./components/TestingStart.jsx"
import QuizCompleted from "./components/QuizComponent.jsx"
import './reset.css' 

function App() {

    return (
        <div className='App'>
            <TestingDone />
         </div>
    );
}

export default App;
