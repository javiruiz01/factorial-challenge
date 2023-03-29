import { FC, useState } from 'react';
import { Chart1m } from './charts/Chart1m';
import { Chart1h } from './charts/Chart1h';
import { Chart1d } from './charts/Chart1d';
import { MetricModal } from './MetricModal';

export const Dashboard: FC = () => {
  const [name, setName] = useState('name-1');
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mx-auto my-0 w-full max-w-5xl md:px-2">
      <div className="flex justify-between w-full align-text-bottom">
        <h1 className="text-gray-900 text-5xl font-bold">Dashboard</h1>

        <div className="flex gap-2">
          <select
            className="bg-gray-50 border border-solid border-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2"
            name="name"
            aria-label="Metric name"
            id="nameSelect"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <option className="text-gray-900" value="name-1">
              name-1
            </option>
            <option className="text-gray-900" value="name-2">
              name-2
            </option>
          </select>

          <button
            className="text-factorial-red bg-white border border-solid border-gray-300 rounded-md py-2 px-4 font-semibold hover:bg-gray-100 float-right"
            onClick={() => setOpenModal(true)}
          >
            Create
          </button>
        </div>
      </div>

      <section className="flex flex-col mt-4">
        <div className="w-full">
          <h3 className="text-gray-900 text-xl font-semibold mb-2">
            1 hour <span className="text-factorial-red">@</span> 1 minute
          </h3>
          <Chart1m name={name} />
        </div>

        <div className="flex flex-col md:flex-row mt-6">
          <div className="w-full">
            <h3 className="text-gray-900 text-xl font-semibold mb-2">
              1 day <span className="text-factorial-red">@</span> 1 hour
            </h3>
            <Chart1h name={name} />
          </div>
          <div className="w-full">
            <h3 className="text-gray-900 text-xl font-semibold mb-2">
              1 week <span className="text-factorial-red">@</span> 1 day
            </h3>
            <Chart1d name={name} />
          </div>
        </div>
      </section>
      <MetricModal open={openModal} setOpen={setOpenModal} />
    </div>
  );
};
