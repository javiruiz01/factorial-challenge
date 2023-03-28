using factorial_challenge.Models;

namespace factorial_challenge.Repositories;

public interface IMetricsRepository
{
    Task<IEnumerable<Metric>> GetMetrics(string name);
}