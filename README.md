# Factorial Challenge

## Description

> Your challenge is to build a Frontend + Backend application that allows you to post and visualize metrics in a usable way. Each metric will have a timestamp, name, and value. The metrics will be shown in a timeline and must show averages per minute/hour/day and persisted in the database.

For this purpose, I will be creating the following:

- A frontend application with
  - React
  - Vite
  - Tailwind
  - Recharts
- A backend application with dotnet
- An SQL Server database: It has been filled with metrics for two different names: `name-1` and `name-2`. This way, we're able to filter by them in the frontend.

## Initial idea

The initial idea was to have two tables: `Metrics` and `Measurements`. With these tables, we could be posting however many metrics we wanted to the `Measurements` table, we would have a job that would go processing and consolidating the measurements by minute into the `Metrics` table. Computing based on minutes is not computationally intensive (at most 10080 minutes in a week), so we would only have to worry about generating the proper values per minute.

This way of doing was quickly dismissed, since we didn't have that much time. Instead, I went with a single table in charge of everything.

## Running locally

We're going to be running the frontend and the backend+db separately:

1. Build the docker compose for our backend + db

```sh
docker-compose build
docker-compose up
```

NB: You might run into problems if working with an Apple Silicon chip, be sure to have latest Docker installed, and activated the option: `Use Rosetta for x86/amd64 emulation on Apple Silicon` ([source](https://github.com/microsoft/mssql-docker/issues/668#issuecomment-1439546882))

2. Run the frontend on it's own

```sh
cd factorial-challenge-be
npm i
npm run dev
```

## TODOs

[x] Save metrics in database

[x] Expose metrics to frontend through an API by minute

[x] Expose metrics to frontend through an API by hour

[x] Expose metrics to frontend through an API by day

[x] Allow users to filter by metric name

[x] Allow users to post new metrics through frontend

[x] Allow users to see all information regarding a metric in the graph

[x] Run backend + sql together with docker compose

[ ] Get metric names through an API call.

[ ] Simplify logic for handling API states when calling to get metrics

[ ] Sync selected metric name with a parameter in the url

[ ] Handle new metrics by updating previous value if exists, insert otherwise

[ ] Min-max values on the first graph look weird, but this is due to the mock we're using, the idea is that they could be shown with the average in between.

[ ] Add validation to the creation form

[ ] Handle errors in form when creating metrics

[ ] Show confirmation that the metric has been created

[ ] Allow users to see metrics by date

[ ] DB password should passed as an environment variable
