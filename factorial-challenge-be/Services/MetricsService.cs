using factorial_challenge.Models;
using factorial_challenge.Repositories;

namespace factorial_challenge.Services;

public class MetricsService : IMetricsService
{
    // Since we're not filtering by date because we're using mocked data,
    // we fetch all available data points (2 weeks), and then we take
    // the number of minutes we need to be shown in the graph
    private const int MinutesInAnHour = 60;
    private const int MinutesInADay = 1440;

    private readonly IMetricsRepository _metricsRepository;

    public MetricsService(IMetricsRepository metricsRepository)
    {
        _metricsRepository = metricsRepository ?? throw new ArgumentNullException(nameof(metricsRepository));
    }

    public async Task<IEnumerable<Metric>> GetMetricsPerMinute(string name)
    {
        var allMetrics = await _metricsRepository.GetMetrics(name);
        return allMetrics.Take(MinutesInAnHour);
    }

    public async Task<IEnumerable<Metric>> GetMetricsPerHour(string name)
    {
        var metricsPerMinute = await _metricsRepository.GetMetrics(name);

        return AggregatePerDuration(metricsPerMinute.Take(MinutesInADay), TimeSpan.FromHours(1));
    }

    public async Task<IEnumerable<Metric>> GetMetricsPerDay(string name)
    {
        var metricsPerMinute = await _metricsRepository.GetMetrics(name);

        return AggregatePerDuration(metricsPerMinute, TimeSpan.FromDays(1));
    }

    public async Task AddMetric(Measure measure)
    {
        await _metricsRepository.AddMetric(measure);
    }

    private static IEnumerable<Metric> AggregatePerDuration(IEnumerable<Metric> stats, TimeSpan window)
    {
        var enumerable = stats as Metric[] ?? stats.ToArray();
        if (enumerable.Length == 0)
        {
            return Enumerable.Empty<Metric>();
        }

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