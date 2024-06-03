// src/styled.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 5px;
`;

export const Header = styled.h1`
  font-size: 24px;
  color: #0366d6;
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #24292e;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const Select = styled.select`
  padding: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
`;

export const LogContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
`;

export const LogMessage = styled.div`
  font-size: 12px;
  color: #586069;
`;

export const ExampleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const Example = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 5px;
  width: 45%;

  pre {
    background-color: #f6f8fa;
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

// src/styled.js
// добавляем новый экспорт
export const FormContainer = styled.div`
display: flex;
flex-direction: column;
`;
