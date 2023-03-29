import { FC } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { State, TimeSpan, useMetrics } from '../../hooks/useMetrics';
import { CustomTooltip } from './Tooltip';

export const Chart1d: FC<{ name: string }> = ({ name }) => {
  const [state, metrics] = useMetrics(name, TimeSpan.DAY);

  if (state === State.LOADING) {
    return <div className="w-full h-[300px]">Loading...</div>;
  }

  if (state === State.ERROR) {
    return <div>An error occurred</div>;
  }

  if (!metrics) {
    return <div>Oops something went wrong</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={metrics}>
        <defs>
          <linearGradient id="average" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          name="Average"
          type="monotone"
          dataKey="avg"
          fillOpacity={1}
          fill="url(#average)"
        />
        <CartesianGrid stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
};
