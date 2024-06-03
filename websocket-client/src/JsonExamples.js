// src/JsonExamples.js
import React from 'react';
import { ExampleContainer, Example } from './styled';

const JsonExamples = () => {
    const example1 = {
        file_id: "665db3d90d14a2f245c6e2a6",
        target_col: "temp_max",
        algorithm: "DefaultForecaster",
        algorithm_params: [
            { parametr: "max_forecast_steps", value: null },
            { parametr: "granularity", value: null }
        ],
        train_percentage: 80,
        file_mode: "single"
    };

    const example2 = {
        file_id: "665db3d90d14a2f245c6e2a6",
        columns: ["temp_max"],
        algorithm: "DefaultDetector",
        label_column: "temp_min",
        algorithm_params: [
            { parametr: "n_threads", value: 1 },
            { parametr: "granularity", value: null }
        ],
        train_percentage: 50,
        file_mode: "single"
    };


    return (
        <ExampleContainer>
            <Example>
                <h3>Forecast Example</h3>
                <pre>{JSON.stringify(example1, null, 2)}</pre>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(example1, null, 2))}>Copy JSON</button>
            </Example>
            <Example>
                <h3>Anomaly Example</h3>
                <pre>{JSON.stringify(example2, null, 2)}</pre>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(example2, null, 2))}>Copy JSON</button>
            </Example>
        </ExampleContainer>
    );

};

export default JsonExamples;
