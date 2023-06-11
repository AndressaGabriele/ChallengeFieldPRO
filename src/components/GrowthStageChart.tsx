import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import DataPoint from '../typings/datapoint.type';


function GrowthStageChart() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json');
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    if (data.length > 0) {
      createChart();
    }
  }, [data]);
  
  
  const chartRef = useRef<Chart | null>(null);

  const createChart = () => {
    if (chartRef.current) {
        chartRef.current.destroy();
      }

    const ctx = document.getElementById('growthChart') as HTMLCanvasElement;
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      options: {
        indexAxis: 'x',
        scales: {
            x: {
                stacked: true
            }
        }
    },
      data: {
        labels: data.map((point) => {
          const timestamp: number = point.time
          const date: Date = new Date(timestamp * 1000);

          const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
          const formatedDate: string = date.toLocaleString('en-US', options);

          return formatedDate;
        }),
        datasets: [
          {
            label: 'nvdi',
            data: data.map((point) => point.ndvi),
            borderWidth: 1,
            cubicInterpolationMode: 'monotone',
            tension: 0.1, 
            fill: {
              target: 'origin',
              above: 'rgba(255, 0, 0, 0.4)',
              below: 'rgba(255, 0, 0, 0.1)' 
            },
            pointRadius: 0,
            backgroundColor: 'red', 
            borderJoinStyle: 'round'
            
          },
          {
            label: 'degree_days',
            data: data.map((point) => point.degree_days),
            borderWidth: 1,
            
            cubicInterpolationMode: 'monotone', 
            tension: 0.1, 
            fill: {
              target: 'origin',
              above: 'rgba(0, 0, 255, 0.4)', 
              below: 'rgba(0, 0, 255, 0.1)' 
            },
            pointRadius: 0,
            borderColor: 'blue',
            borderJoinStyle: 'round' 
          },
          {
            label: 'precipitation',
            data: data.map((point) => point.precipitation),
            borderWidth: 1,
            cubicInterpolationMode: 'monotone',
            tension: 0.1, 
            fill: {
              target: 'origin',
              above: 'rgba(0, 255, 0, 0.4)', 
              below: 'rgba(0, 255, 0, 0.1)' 
            },
         
            pointRadius: 0,
            borderColor: 'green',
          },
        ],
      },
    });
  };

  return <canvas id="growthChart" />;
}


export default GrowthStageChart;

