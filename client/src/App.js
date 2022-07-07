import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
    const [text, setText] = useState([])
    const lambdaUrl = "https://a2pp63z27yhzgudqlxshixm3240ctyjj.lambda-url.eu-west-2.on.aws/"

    useEffect(() => {
        fetch(lambdaUrl)
            .then(res => res.json())
            .then(data => data.rows)
            .then(setText)
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Everyone in the database...</p>
                {text.map((el, i) => {
                    return (<p key={i}>{el.user_name}</p>)
                })}
                <br />
                <p>Everyone in team NHS-1</p>
                {text.filter(user => user.team_id === 'NHS-1').map((el, i) => {
                    return (<p key={i}>{el.user_name}</p>)
                })}
            </header>
        </div>
    );
}

export default App;
