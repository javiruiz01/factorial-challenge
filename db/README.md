# Database

For our database, I chose to go with SQL Server, since it's the one that I'm most familiar with (the docker image might be a little bit heavy, but it does its job, at least for a local project like this one).

When we run our Docker image, we will execute the `preload.sh` file, which is charged with waiting for the database to be fully operational, so that it can execute all the scripts found in the scripts folder:

- `scripts/000_baseline.sql`: Just the minimum we need to start working with our metrics.
