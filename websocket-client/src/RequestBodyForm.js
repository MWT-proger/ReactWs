// src/RequestBodyForm.js
import React, { useState } from 'react';
import { Form, Label, Input, TextArea, Button, Select, FormContainer } from './styled';
import BASE_URL from './config'; // Импортируем BASE_URL
import JsonExamples from './JsonExamples'; // Импортируем JsonExamples


const RequestBodyForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('demo_user');
    const [password, setPassword] = useState('demo_password');
    const [urlPath, setUrlPath] = useState(`ws://${BASE_URL}/api/v1/forecasts/ws/train-test`);
    const urlPathForecasts = `ws://${BASE_URL}/api/v1/forecasts/ws/train-test`;
    const urlPathAnomalies = `ws://${BASE_URL}/api/v1/anomalies/ws/train-test`;
    const [jsonBody, setJsonBody] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        console.log('Username changed:', e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log('Password changed:', e.target.value);
    };

    const handleUrlPathChange = (e) => {
        setUrlPath(e.target.value);
        console.log('URL Path changed:', e.target.value);
    };

    const handleJsonBodyChange = (e) => {
        setJsonBody(e.target.value);
        console.log('JSON body changed:', e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const requestData = JSON.parse(jsonBody);
            console.log('Parsed JSON body:', requestData);
            onSubmit({ username, password, url: `${urlPath}`, requestData });
        } catch (error) {
            console.error('Invalid JSON format:', error);
        }
    };

    return (

        <FormContainer>
            <JsonExamples />
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="username">Username:</Label>
                <Input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <Label htmlFor="password">Password:</Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Label htmlFor="urlPath">Select URL Path:</Label>
                <Select
                    id="urlPath"
                    name="urlPath"
                    value={urlPath}
                    onChange={handleUrlPathChange}
                >
                    <option value={urlPathForecasts}>{urlPathForecasts}</option>
                    <option value={urlPathAnomalies}>{urlPathAnomalies}</option>
                </Select>
                <Label htmlFor="jsonBody">JSON Body:</Label>
                <TextArea
                    rows={10}
                    id="jsonBody"
                    value={jsonBody}
                    onChange={handleJsonBodyChange}
                    placeholder="Paste JSON body here..."
                />
                <Button type="submit">Send Request</Button>
            </Form>

        </FormContainer>
    );
};

export default RequestBodyForm;
