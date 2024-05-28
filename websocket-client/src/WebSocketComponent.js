import React, { useState, useEffect } from 'react';
import RequestBodyForm from './RequestBodyForm';
import { Container, Header, LogContainer, LogMessage } from './styled';
import ChartComponent from './ChartComponent';

const WebSocketComponent = () => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState("");
    const [result, setResult] = useState(null);
    const [logs, setLogs] = useState([]);
    const [socket, setSocket] = useState(null);

    const handleSubmit = ({ jwt, url, requestData }) => {
        const log = (message) => {
            setLogs((prevLogs) => [...prevLogs, message]);
            console.log(message);
        };

        log('Form submitted with: ' + JSON.stringify({ jwt, url, requestData }));
        const ws = new WebSocket(`${url}?token=${jwt}`);

        ws.onopen = () => {
            log('Connected to WebSocket with URL: ' + url);
            ws.send(JSON.stringify(requestData));
            log('Sent request data: ' + JSON.stringify(requestData));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            log('Received message: ' + JSON.stringify(data));
            if (data.progress !== undefined) {
                setProgress(data.progress.percent);
                setStage(data.progress.stage);
            }
            setResult(data);
        };

        ws.onclose = () => {
            log('Disconnected from WebSocket');
        };

        ws.onerror = (error) => {
            log('WebSocket error: ' + error);
        };

        setSocket(ws);
    };

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    return (
        <Container>
            <Header>Training and Testing Progress</Header>
            <RequestBodyForm onSubmit={handleSubmit} />
            <p>Stage: {stage}</p>
            <p>Progress: {progress}%</p>
            {result && (
                <div>
                    <h2>Result</h2>
                    <ChartComponent data={result.data} />
                </div>
            )}
            <LogContainer>
                {logs.map((log, index) => (
                    <LogMessage key={index}>{log}</LogMessage>
                ))}
            </LogContainer>
        </Container>
    );
};

export default WebSocketComponent;


// const ws = new ReconnectingWebSocket(`ws://localhost:7000/api/v1/forecast/ws/train-test`);