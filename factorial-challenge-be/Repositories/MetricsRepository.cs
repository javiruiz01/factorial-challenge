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
        var random = new Random();
        return Task.FromResult(Enumerable.Range(1, 2500)
            .Select(idx => new Metric
            {
                Id = Guid.NewGuid(),
                Name = name,
                Timestamp = DateTime.UtcNow.Subtract(TimeSpan.FromMinutes(idx)),
                Avg = random.Next(20, 23),
                Count = random.Next(1, 6),
                Min = random.Next(10),
                Max = random.Next(10),
            }).Concat(Enumerable.Range(1, 2500).Select(idx => new Metric
            {
                Id = Guid.NewGuid(),
                Name = name,
                Timestamp = DateTime.UtcNow.Subtract(TimeSpan.FromMinutes(idx + 30)),
                Avg = random.Next(24, 27),
                Count = random.Next(6),
                Min = random.Next(10),
                Max = random.Next(10, 20),
            })));
    }
}