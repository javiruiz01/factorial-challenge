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

    public async Task<IEnumerable<Metric>> GetMetricsPerMinute(string name)
    {
        return await _metricsRepository.GetMetrics(name);
    }

    public async Task<IEnumerable<Metric>> GetMetricsPerHour(string name)
    {
        var metricsPerMinute = await _metricsRepository.GetMetrics(name);

        return AggregatePerDuration(metricsPerMinute, TimeSpan.FromHours(1));
    }

    public async Task<IEnumerable<Metric>> GetMetricsPerDay(string name)
    {
        var metricsPerMinute = await _metricsRepository.GetMetrics(name);

        return AggregatePerDuration(metricsPerMinute, TimeSpan.FromDays(1));
    }

    public Task AddMetric()
    {
        throw new NotImplementedException();
    }

    private static IEnumerable<Metric> AggregatePerDuration(IEnumerable<Metric> stats, TimeSpan window)
    {
        var enumerable = stats as Metric[] ?? stats.ToArray();
        var windowMetrics = new List<Metric> {enumerable.First()};

        foreach (var stat in enumerable)
        {
            var target = windowMetrics.Last();

            var difference = stat.Timestamp > target.Timestamp
                ? stat.Timestamp.Subtract(target.Timestamp)
                : target.Timestamp.Subtract(stat.Timestamp);
            if (difference < window)
            {
                target.Count += stat.Count;
                target.Avg = (target.Avg + stat.Avg) / 2;
                target.Min = Math.Min(target.Min, stat.Min);
                target.Max = Math.Max(target.Max, stat.Max);
                // We update latest values with current metric, except the timestamp
                windowMetrics[^1] = target;
            }
            else
            {
                windowMetrics.Add(stat);
            }
        }

        return windowMetrics;
    }
}