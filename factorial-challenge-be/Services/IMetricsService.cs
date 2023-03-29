using factorial_challenge.Models;

namespace factorial_challenge.Services;

public interface IMetricsService
{
    Task<IEnumerable<Metric>> GetMetricsPerMinute(string name);
    Task<IEnumerable<Metric>> GetMetricsPerHour(string name);
    Task<IEnumerable<Metric>> GetMetricsPerDay(string name);

    Task AddMetric(Measure measure);
}