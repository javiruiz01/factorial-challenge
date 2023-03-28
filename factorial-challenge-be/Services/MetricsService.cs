using factorial_challenge.Models;
using factorial_challenge.Repositories;

namespace factorial_challenge.Services;

public class MetricsService : IMetricsService
{
    private readonly IMetricsRepository _metricsRepository;

    public MetricsService(IMetricsRepository metricsRepository)
    {
        _metricsRepository = metricsRepository ?? throw new ArgumentNullException(nameof(metricsRepository));
    }

    public Task<IEnumerable<Metric>> GetMetricsPerMinute(string name)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Metric>> GetMetricsPerHour(string name)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Metric>> GetMetricsPerDay(string name)
    {
        throw new NotImplementedException();
    }

    public Task AddMetric()
    {
        throw new NotImplementedException();
    }
}