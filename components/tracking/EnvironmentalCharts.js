import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { prepareChartData, createCustomDot, createTooltipFormatter } from '@/utils/chartUtils';

const EnvironmentalCharts = ({ shipment }) => {
  const chartData = prepareChartData(shipment);

  // Custom tooltip label formatter function
  const labelFormatter = (label) => {
    const dataPoint = chartData.find(dp => dp.name === label);
    return `${dataPoint?.location || ''} (${label})`;
  };

  return (
    <div className="mt-4 border-t pt-4">
      <p className="font-medium mb-3">Environmental Data Trends</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <Card className="p-4 bg-gray-50">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <span className="text-red-500 text-[8px]">°C</span>
            </div>
            Temperature
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  angle={-30}
                  height={60}
                  textAnchor="end"
                />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: '12px' }}
                  formatter={createTooltipFormatter('Temperature', '°C')}
                  labelFormatter={labelFormatter}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={(props) => createCustomDot(props, chartData, "temperature", "#ef4444")}
                  activeDot={{ r: 6, stroke: "#f87171", strokeWidth: 2 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Humidity Chart */}
        <Card className="p-4 bg-gray-50">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-500 text-[8px]">%</span>
            </div>
            Humidity
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  angle={-30}
                  height={60}
                  textAnchor="end"
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: '12px' }}
                  formatter={createTooltipFormatter('Humidity', '%')}
                  labelFormatter={labelFormatter}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={(props) => createCustomDot(props, chartData, "humidity", "#3b82f6")}
                  activeDot={{ r: 6, stroke: "#60a5fa", strokeWidth: 2 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Light Level Chart */}
        <Card className="p-4 bg-gray-50">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <span className="text-yellow-500 text-[8px]">lx</span>
            </div>
            Light Level
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  angle={-30}
                  height={60}
                  textAnchor="end"
                />
                <YAxis domain={['dataMin - 100', 'dataMax + 100']} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: '12px' }}
                  formatter={createTooltipFormatter('Light Level', ' lux')}
                  labelFormatter={labelFormatter}
                />
                <Line
                  type="monotone"
                  dataKey="lux"
                  stroke="#eab308"
                  strokeWidth={2}
                  dot={(props) => createCustomDot(props, chartData, "lux", "#eab308")}
                  activeDot={{ r: 6, stroke: "#fcd34d", strokeWidth: 2 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Battery Life Chart */}
        <Card className="p-4 bg-gray-50">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <span className="text-green-500 text-[8px]">%</span>
            </div>
            Battery Life
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  angle={-30}
                  height={60}
                  textAnchor="end"
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: '12px' }}
                  formatter={createTooltipFormatter('Battery Life', '%')}
                  labelFormatter={labelFormatter}
                />
                <Line
                  type="monotone"
                  dataKey="batteryLife"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={(props) => createCustomDot(props, chartData, "batteryLife", "#22c55e")}
                  activeDot={{ r: 6, stroke: "#86efac", strokeWidth: 2 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnvironmentalCharts;