namespace factorial_challenge.Models;

public class Metric
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public DateTime Timestamp { get; set; }

    public decimal Avg { get; set; }

    public decimal Count { get; set; }

    public decimal Min { get; set; }

    public decimal Max { get; set; }
}