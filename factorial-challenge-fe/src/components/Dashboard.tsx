import { FC } from 'react';
import { Chart1m } from './charts/Chart1m';
import { Chart1h } from './charts/Chart1h';
import { Chart1d } from './charts/Chart1d';

export const Dashboard: FC = () => {
  return (
    <div className="mx-auto my-0 w-full max-w-5xl md:px-2">
      <h1 className="text-gray-900 text-5xl font-bold">Dashboard</h1>

      <section className="flex flex-col mt-4">
        <div className="w-full">
          <h3 className="text-gray-900 text-xl font-semibold mb-2">
            1 hour <span className="text-factorial-red">@</span> 1 minute
          </h3>
          <Chart1m />
        </div>

        <div className="flex flex-col md:flex-row mt-6">
          <div className="w-full">
            <h3 className="text-gray-900 text-xl font-semibold mb-2">
              1 day <span className="text-factorial-red">@</span> 1 hour
            </h3>
            <Chart1h></Chart1h>
          </div>
          <div className="w-full">
            <h3 className="text-gray-900 text-xl font-semibold mb-2">
              1 week <span className="text-factorial-red">@</span> 1 day
            </h3>
            <Chart1d></Chart1d>
          </div>
        </div>
      </section>
    </div>
  );
};
