export interface MetricsResponse {
  name: string;
  timestamp: string;
  avg: number;
  count: number;
  min: number;
  max: number;
}

export interface Metric extends MetricsResponse {
  date: string;
}
