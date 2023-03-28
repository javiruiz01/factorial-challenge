# Database

For our database, I chose to go with SQL Server, since it's the one that I'm most familiar with (the docker image might be a little bit heavy, but it does its job, at least for a local project like this one).

When we run our Docker image, we will execute the `preload.sh` file, which is charged with waiting for the database to be fully operational, so that it can execute all the scripts found in the scripts folder:

- `scripts/000_baseline.sql`: Just the minimum we need to start working with our metrics.

## Mocking

From the mock we're using in dotnet, I have copied those results, and transformed them into valid `INSERT` queries in SQL.

This transformation is done by running `node index.js` inside the mock folder. This will generate two files that we will then rename and move into the `scripts` folder so that we can add the mock when mounting the database.

Each mock will be a file a different metric name, so that we can at least filter and see the result in the frontend.