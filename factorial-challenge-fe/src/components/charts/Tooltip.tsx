const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;

export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const [{ payload: data }] = payload;
    const time = new Date(data.timestamp);

    return (
      <div className="bg-white px-4 py-2">
        <div className="flex flex-col mb-2">
          <h5 className="text-gray-900 text-lg font-semibold">
            {time.toLocaleDateString(undefined, dateOptions)}
          </h5>
          <span className="text-gray-900 opacity-80 text-sm font-light leading-none">
            {time.toISOString()}
          </span>
        </div>

        <dl>
          <div className="flex gap-1">
            <dt className="text-factorial-red font-ligh">Average:</dt>
            <dd className="text-gray-900 font-mono slashed-zero tabular-nums">
              {Number(data.avg).toFixed(2)}
            </dd>
          </div>

          <div className="flex gap-1 align-bottom">
            <dt className="text-factorial-red font-ligh">Count:</dt>
            <dd className="text-gray-900 font-mono slashed-zero tabular-nums">
              {data.count}
            </dd>
          </div>

          <div className="flex gap-1 align-bottom">
            <dt className="text-factorial-red font-ligh">Min:</dt>
            <dd className="text-gray-900 font-mono slashed-zero tabular-nums">
              {data.min}
            </dd>
          </div>

          <div className="flex gap-1 align-bottom">
            <dt className="text-factorial-red font-ligh">Max:</dt>
            <dd className="text-gray-900 font-mono slashed-zero tabular-nums">
              {data.max}
            </dd>
          </div>
        </dl>
      </div>
    );
  }

  return null;
};
