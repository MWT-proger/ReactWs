import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Регистрация всех компонентов Chart.js
Chart.register(...registerables);

const ChartComponent = ({ data }) => {
    // Проверка на наличие данных
    if (!data || !data.test_ts || !data.test_ts.data || !data.test_ts.index) {
        return <p>Данные не загружены или отсутствуют.</p>;
    }

    // Подготовим данные для графика
    const chartData = {
        labels: data.test_ts.index,
        datasets: [
            {
                label: 'Температура (макс)',
                data: data.test_ts.data.temp_max,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
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
        }
    };

    return (
        <div>
            <h2>График температуры</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default ChartComponent;
