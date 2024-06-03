// src/JsonExamples.js
import React from 'react';
import { ExampleContainer, Example } from './styled';

const JsonExamples = () => {
    const example1 = {
        key1: "value1",
        key2: "value2",
        key3: "value3"
    };

    const example2 = {
        anotherKey1: "anotherValue1",
        anotherKey2: "anotherValue2",
        anotherKey3: "anotherValue3"
    };

    return (
        <ExampleContainer>
            <Example>
                <h3>Example 1</h3>
                <pre>{JSON.stringify(example1, null, 2)}</pre>
            </Example>
            <Example>
                <h3>Example 2</h3>
                <pre>{JSON.stringify(example2, null, 2)}</pre>
            </Example>
        </ExampleContainer>
    );
};

export default JsonExamples;
