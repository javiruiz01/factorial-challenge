import { FC, useState } from 'react';
import Modal from 'react-modal';
import { BASE_URL } from '../constants';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    maxWidth: '500px',
  },
  position: 'relative',
};
Modal.setAppElement('#root');

interface Form {
  name: string;
  value: string;
  timestamp: string;
}

export const MetricModal: FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const [form, setForm] = useState<Form>({
    name: '',
    value: '',
    timestamp: '',
  });

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const data = { ...form, value: Number(form.value) };

    fetch(`${BASE_URL}/metrics`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      closeModal();
    });
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create metric modal"
    >
      <button className="absolute top-0 right-0 m-4" onClick={closeModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-gray-900 text-xl font-bold">
        Create new <span className="text-factorial-red">Metric</span>
      </h2>

      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="text-gray-900 text-l font-semibold"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="bg-white rounded-md border border-gray-100 border-solid px-4 py-2"
              value={form.name}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }));
              }}
              placeholder="name-1"
              name="name"
              id="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-gray-900 text-l font-semibold"
              htmlFor="value"
            >
              Value
            </label>
            <input
              className="bg-white rounded-md border border-gray-100 border-solid px-4 py-2"
              value={form.value}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, value: e.target.value }));
              }}
              placeholder="24.0"
              name="value"
              id="value"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-gray-900 text-l font-semibold"
              htmlFor="timestamp"
            >
              Timestamp
            </label>
            <input
              className="bg-white rounded-md border border-gray-100 border-solid px-4 py-2"
              value={form.timestamp}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, timestamp: e.target.value }));
              }}
              type="datetime-local"
              name="timestamp"
              id="timestamp"
            />
          </div>
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="text-factorial-red bg-white border border-solid border-gray-300 rounded-md py-2 px-4 mt-6 font-semibold hover:bg-gray-100 float-right"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};
