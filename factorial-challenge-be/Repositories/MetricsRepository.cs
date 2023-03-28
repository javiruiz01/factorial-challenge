using System.Data.SqlClient;
using System.Text;
using Dapper;
using factorial_challenge.Models;

namespace factorial_challenge.Repositories;

public class MetricsRepository : IMetricsRepository
{
    private readonly IDatabaseSettings _databaseSettings;

    public MetricsRepository(IDatabaseSettings databaseSettings)
    {
        _databaseSettings = databaseSettings ?? throw new ArgumentNullException(nameof(databaseSettings));
    }

    public async Task<IEnumerable<Metric>> GetMetrics(string name)
    {
        var query = new StringBuilder()
            .AppendLine("SELECT Id, Name, Timestamp, Avg, Count, Min, Max FROM [factorial].[factorial].[Metrics]")
            .AppendLine("WHERE Name = @name")
            .AppendLine("ORDER BY Timestamp DESC")
            .ToString();
        await using var connection = new SqlConnection(_databaseSettings.ConnectionString);
        return await connection.QueryAsync<Metric>(query, new {name});
    }
}