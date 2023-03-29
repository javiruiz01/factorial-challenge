import { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';
import { Metric, MetricsResponse } from '../models/metric';

export enum TimeSpan {
  MINUTE = '1m',
  HOUR = '1h',
  DAY = '1d',
}

export enum State {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
}

export type MaybeMetrics = Metric[] | null;

export const useMetrics = (
  target: string,
  timeSpan: TimeSpan
): [State, MaybeMetrics] => {
  const [state, setState] = useState(State.LOADING);
  const [metrics, setMetrics] = useState<MaybeMetrics>(null);

  useEffect(() => {
    async function getMetrics() {
      setState(State.LOADING);
      setMetrics(null);
      const url = `${BASE_URL}/metrics/${target}/${timeSpan}`;

      const response = await fetch(url);
      if (!response.ok) {
        setState(State.ERROR);
        throw new Error('Network response was not ok');
      }

      const rawMetrics: MetricsResponse[] = await response.json();
      setState(State.IDLE);
      setMetrics(
        rawMetrics.map(({ timestamp, ...rest }) => {
          const date = new Date(timestamp);
          return {
            timestamp,
            date: `${date.getHours()}:${date.getMinutes()}`,
            ...rest,
          };
        })
      );
    }

    let ignore = false;
    getMetrics();

    return () => {
      ignore = true;
    };
  }, [target]);

  return [state, metrics];
};
