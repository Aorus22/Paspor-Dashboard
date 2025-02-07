"use client";

import { useState, useEffect, useContext } from 'react';
import { UserContext } from "@/context/UserContext";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getFullMenuName } from '@/constants/menu';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InputAndGraph = ({ data_name }) => {
  const { user } = useContext(UserContext);

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  const [data, setData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/data/${data_name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const result = await res.json();
          const initialData = {};
          months.forEach(month => {
            const entry = result.data.find(item => item.month === month);
            initialData[month] = entry ? entry.total : 0;
          });
          setData(initialData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    if (user) {
      fetchData();
    }
  }, [data_name, user]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUpdate = async () => {
    const numericValue = Number(inputValue);

    if (!Number.isInteger(numericValue) || numericValue < 0) {
      setError('Please enter a valid non-negative integer.');
      return;
    }

    try {
      const res = await fetch(`/api/data/${data_name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month: selectedMonth, total: numericValue }),
      });

      const result = await res.json();

      if (res.ok) {
        setData({
          ...data,
          [selectedMonth]: numericValue,
        });
        setInputValue('');
        setError('');
      } else {
        setError(result.message || 'Failed to update data.');
      }
    } catch (err) {
      console.error('Error updating data:', err);
      setError('Failed to update data.');
    }
  };

  const chartData = {
    labels: months,
    datasets: [
      {
        label: `Total`,
        data: months.map((month) => data[month]),
        backgroundColor: (() => {
          const entries = months.map(month => ({ 
            month, 
            value: data[month] || 0 
          }));
          
          const sortedEntries = [...entries].sort((a, b) => b.value - a.value);
          
          const indigoPalette = [
            '#1e1b4b',
            '#312e81',
            '#3730a3',
            '#4338ca',
            '#4f46e5',
            '#6366f1',
            '#818cf8',
            '#a5b4fc',
            '#c7d2fe', 
            '#d4dcff', 
            '#e0e7ff',
            '#e8edff'
          ];
          
          return months.map(month => {
            const rank = sortedEntries.findIndex(entry => entry.month === month);
            return indigoPalette[rank] || indigoPalette[indigoPalette.length - 1];
          });
        })()
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `${getFullMenuName(data_name)}`,
        font: {
          size: 18
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false 
        },
        ticks: {
          color: '#6b7280' 
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb', 
          borderDash: [5]
        },
        ticks: {
          color: '#6b7280',
          stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) return value;
            return null;
          }
        }
      }
    }
  };

  if (!user) {
    return null; 
  }

  return (
    <div className='p-6'>
      {user.role === "ADMIN" && (
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="month" className="mb-2 font-medium">
                Pilih Bulan:
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="passportCount" className="mb-2 font-medium">
                Total:
              </label>
              <input
                type="number"
                id="passportCount"
                min="0"
                step="1" 
                value={inputValue}
                onChange={handleValueChange}
                placeholder="Masukkan Total"
                className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#4a6283] text-white font-semibold rounded-md hover:bg-[#1f2937] transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      <div className='flex justify-center'>
        <div className="bg-white border border-opacity-50 border-[#4a6283] rounded-2xl p-4 h-96 w-[64em]">
            <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default InputAndGraph;
