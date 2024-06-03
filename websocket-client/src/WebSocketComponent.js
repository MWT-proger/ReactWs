// src/WebSocketComponent.js
import React, { useState, useEffect } from 'react';
import RequestBodyForm from './RequestBodyForm';
import { Container, Header, LogContainer, LogMessage } from './styled';
import ChartComponent from './ChartComponent';
import BASE_URL from './config';

const WebSocketComponent = () => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState("");
    const [result, setResult] = useState(null);
    const [logs, setLogs] = useState([]);
    const [socket, setSocket] = useState(null);

    const log = (message) => {
        setLogs((prevLogs) => [...prevLogs, message]);
        console.log(message);
    };

    const authenticate = async (username, password) => {
        try {
            const response = await fetch(`http://${BASE_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();
            return data.access_token;
        } catch (error) {
            log('Authentication error: ' + error.message);
            return null;
        }
    };

    const handleSubmit = async ({ username, password, url, requestData }) => {
        const token = await authenticate(username, password);
        if (!token) {
            log('Failed to obtain JWT');
            return;
        }

        log('Form submitted with: ' + JSON.stringify({ url, requestData }));
        const ws = new WebSocket(`${url}?token=${token}`);

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


// const ws = new ReconnectingWebSocket(`ws://localhost:7000/api/v1/forecasts/ws/train-test`);
// const ws = new ReconnectingWebSocket(`ws://localhost:7000/api/v1/anomalies/ws/train-test`);
