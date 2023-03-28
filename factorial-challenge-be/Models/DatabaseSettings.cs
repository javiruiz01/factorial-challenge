namespace factorial_challenge.Models;

public class DatabaseSettings : IDatabaseSettings
{
    public string ConnectionString { get; set; }
}

public interface IDatabaseSettings
{
    string ConnectionString { get; set; }
}