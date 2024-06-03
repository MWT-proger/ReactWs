import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';

// Регистрация всех компонентов Chart.js и плагина зумирования
Chart.register(...registerables, zoomPlugin);

const ChartComponent = ({ data }) => {
    // Проверка на наличие данных
    if (!data) {
        return <p>Данные не загружены или отсутствуют.</p>;
    }

    // Функция для создания набора данных для графика
    const createDataset = (ts, label) => {
        if (!ts || !ts.data || !ts.index) {
            return null;
        }

        return Object.keys(ts.data).map(key => ({
            label: `${label} - ${key}`,
            data: ts.data[key].map((value, index) => ({ x: new Date(ts.index[index]), y: value })),
            fill: false,
            borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            tension: 0.1
        }));
    };

    // Создание наборов данных
    const trainDatasets = createDataset(data.train_ts, 'Train');
    const testDatasets = createDataset(data.test_ts, 'Test');
    const exogDatasets = createDataset(data.exog_ts, 'Exogenous');
    const testPredDatasets = createDataset(data.test_pred, 'testPred');
    const testLabalsDatasets = createDataset(data.test_labels, 'testLabals');

    // Слияние всех наборов данных
    const allDatasets = [
        ...(trainDatasets || []),
        ...(testDatasets || []),
        ...(exogDatasets || []),
        ...(testPredDatasets || []),
        ...(testLabalsDatasets || [])
    ];

    // Подготовка данных для графика
    const chartData = {
        datasets: allDatasets
    };

    // Настройка опций для графика
    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    enabled: true,
                    mode: 'xy'
                }
            }
        }
    };

    return (
        <div>
            <h2>График данных</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default ChartComponent;
