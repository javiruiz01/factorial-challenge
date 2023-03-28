USE master;
GO

CREATE DATABASE factorial;
GO

USE factorial;
GO

CREATE SCHEMA [factorial] AUTHORIZATION [dbo];
GO

CREATE TABLE factorial.Metrics
(
  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
  [Name] NVARCHAR(100) NOT NULL,
  [Timestamp] [datetime2](7) NOT NULL,
  [Avg] float NULL,
  [Max] float NULL,
  [Min] float NULL,
  [Count] float NULL
);
GO

CREATE TABLE factorial.Measurements
(
  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
  [Name] NVARCHAR(100) NOT NULL,
  [Value] NVARCHAR(100) NOT NULL,
  [Timestamp] [datetime2](7) NOT NULL,
  [Processed] bit NOT NULL
)
GO