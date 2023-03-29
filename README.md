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

## Initial Idea

## TODOs

[ ] Names in the frontend are hardcoded into the frontend, we should be getting them by an API call.
[ ] Right now the logic for handling states while fetching is duplicated among the charts components, we should seek to unify that.
[ ] The name for the metric is right now being handled in the select, it would be nice to have it synced with the url as a path parameter.
[ ] When posting new metrics, we should handle it as an `UPDATE` or `INSERT`, rather than inserting directly.
[ ] Min-max values on the first graph look weird, but this is due to the mock we're using, the idea is that they could be shown with the average in between.
[ ] Add validation to the creation form.
[ ] Handle errors in form when creating metrics.
[ ] Show confirmation that the metric has been created.
