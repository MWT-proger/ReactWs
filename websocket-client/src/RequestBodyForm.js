// src/RequestBodyForm.js
import React, { useState } from 'react';
import { Form, Label, Input, TextArea, Button } from './styled';

const RequestBodyForm = ({ onSubmit }) => {
    const [jwt, setJwt] = useState('');
    const [url, setUrl] = useState('');
    const [jsonBody, setJsonBody] = useState('');

    const handleJwtChange = (e) => {
        setJwt(e.target.value);
        console.log('JWT changed:', e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        console.log('URL changed:', e.target.value);
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
            onSubmit({ jwt, url, requestData });
        } catch (error) {
            console.error('Invalid JSON format:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="jwt">JWT:</Label>
            <Input
                type="text"
                id="jwt"
                name="jwt"
                value={jwt}
                onChange={handleJwtChange}
            />
            <Label htmlFor="url">URL:</Label>
            <Input
                type="text"
                id="url"
                name="url"
                value={url}
                onChange={handleUrlChange}
            />
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
    );
};

export default RequestBodyForm;
