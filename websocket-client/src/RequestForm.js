// src/RequestForm.js
import React, { useState } from 'react';

const RequestForm = ({ onSubmit }) => {
    const [requestData, setRequestData] = useState({
        file_id: "",
        target_col: "",
        algorithm: "DefaultForecaster",
        algorithm_params: [
            { parametr: "max_forecast_steps", value: 100 },
            { parametr: "granularity", value: null }
        ],
        train_percentage: 80,
        file_mode: "single"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData({
            ...requestData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(requestData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="file_id">File ID:</label>
                <input
                    type="text"
                    id="file_id"
                    name="file_id"
                    value={requestData.file_id}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="target_col">Target Column:</label>
                <input
                    type="text"
                    id="target_col"
                    name="target_col"
                    value={requestData.target_col}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="algorithm">Algorithm:</label>
                <input
                    type="text"
                    id="algorithm"
                    name="algorithm"
                    value={requestData.algorithm}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Algorithm Parameters:</label>
                <div>
                    <label>Max Forecast Steps:</label>
                    <input
                        type="number"
                        name="max_forecast_steps"
                        value={requestData.algorithm_params[0].value}
                        onChange={(e) => handleChange({ target: { name: "algorithm_params", value: [{ ...requestData.algorithm_params[0], value: e.target.value }, requestData.algorithm_params[1]] } })}
                    />
                </div>
                <div>
                    <label>Granularity:</label>
                    <input
                        type="text"
                        name="granularity"
                        value={requestData.algorithm_params[1].value}
                        onChange={(e) => handleChange({ target: { name: "algorithm_params", value: [{ ...requestData.algorithm_params[0] }, { ...requestData.algorithm_params[1], value: e.target.value }] } })}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="train_percentage">Train Percentage:</label>
                <input
                    type="number"
                    id="train_percentage"
                    name="train_percentage"
                    value={requestData.train_percentage}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="file_mode">File Mode:</label>
                <input
                    type="text"
                    id="file_mode"
                    name="file_mode"
                    value={requestData.file_mode}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Send Request</button>
        </form>
    );
};

export default RequestForm;
