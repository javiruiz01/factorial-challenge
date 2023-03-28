import { FC } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { State, TimeSpan, useMetrics } from '../../hooks/useMetrics';
import { CustomTooltip } from './Tooltip';

export const Chart1m: FC = () => {
  const [state, metrics] = useMetrics('name-1', TimeSpan.MINUTE);

  if (state === State.LOADING) {
    return <div>Loading...</div>;
  }

  if (state === State.ERROR) {
    return <div>An error occurred</div>;
  }

  if (!metrics) {
    return <div>Oops something went wrong</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={metrics}>
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
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#average)"
        />
        <Line
          name="Min value"
          dot={false}
          type="monotone"
          dataKey="min"
          stroke="rgb(21 128 61)"
        />
        <Line
          name="Max value"
          dot={false}
          type="monotone"
          dataKey="max"
          stroke="rgb(190 18 60)"
        />
        <CartesianGrid stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
