import { FC } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { State, TimeSpan, useMetrics } from '../../hooks/useMetrics';
import { Metric } from '../../models/metric';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const [{ payload: data }] = payload;
    const time = new Date(data.timestamp);

    return (
      <div className="bg-white px-4 py-2">
        <p className="label">{`Date: ${time.getDate()}-${time.getMonth()}@${label}`}</p>
        <p className="intro">Average: {data.avg}</p>
        <p className="intro">Count: {data.count}</p>
        <p className="intro">Min: {data.min}</p>
        <p className="intro">Max: {data.max}</p>
      </div>
    );
  }

  return null;
};

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

  const data: Metric[] = metrics.map(({ timestamp, ...rest }) => {
    const date = new Date(timestamp);
    return {
      timestamp,
      date: `${date.getHours()}:${date.getMinutes()}`,
      ...rest,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <Area
          name="Average"
          type="monotone"
          dataKey="avg"
          stroke="#8884d8"
          strokeWidth={2}
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
