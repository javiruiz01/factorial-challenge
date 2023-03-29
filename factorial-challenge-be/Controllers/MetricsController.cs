using factorial_challenge.Models;
using factorial_challenge.Services;
using Microsoft.AspNetCore.Mvc;

namespace factorial_challenge.Controllers;

[ApiController]
[Route("metrics")]
public class MetricsController : ControllerBase
{
    private readonly IMetricsService _metricsService;

    public MetricsController(IMetricsService metricsService)
    {
        _metricsService = metricsService ?? throw new ArgumentNullException(nameof(metricsService));
    }

    [Route("{name}/1m")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Metric>))]
    public async Task<IActionResult> GetMetricsPerMinute([FromRoute] string name)
    {
        var metrics = await _metricsService.GetMetricsPerMinute(name);
        return Ok(metrics);
    }

    [Route("{name}/1h")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Metric>))]
    public async Task<IActionResult> GetMetricsPerHour([FromRoute] string name)
    {
        var metrics = await _metricsService.GetMetricsPerHour(name);
        return Ok(metrics);
    }

    [Route("{name}/1d")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Metric>))]
    public async Task<IActionResult> GetMetricsPerDay([FromRoute] string name)
    {
        var metrics = await _metricsService.GetMetricsPerDay(name);
        return Ok(metrics);
    }

    [Route("")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> NewMetric([FromBody] Measure newMetric)
    {
        await _metricsService.AddMetric(newMetric);

        return Created($"/metrics/{newMetric.Name}/1m", new { });
    }
}