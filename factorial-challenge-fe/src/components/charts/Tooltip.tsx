export const CustomTooltip = ({ active, payload, label }: any) => {
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
