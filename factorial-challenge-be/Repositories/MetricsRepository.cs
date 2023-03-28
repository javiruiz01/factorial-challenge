using factorial_challenge.Models;

namespace factorial_challenge.Repositories;

public class MetricsRepository : IMetricsRepository
{
    private readonly IDatabaseSettings _databaseSettings;

    public MetricsRepository(IDatabaseSettings databaseSettings)
    {
        _databaseSettings = databaseSettings ?? throw new ArgumentNullException(nameof(databaseSettings));
    }
    
    public Task<IEnumerable<Metric>> GetMetrics(string name)
    {
        throw new NotImplementedException();
    }
}