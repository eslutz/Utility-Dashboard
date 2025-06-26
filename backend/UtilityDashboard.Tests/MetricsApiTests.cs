using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using UtilityDashboard.Api;

namespace UtilityDashboard.Tests;

public class MetricsApiTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
  private readonly WebApplicationFactory<Program> _factory = factory;

  [Fact]
  public async Task GetMetrics_ReturnsSuccessStatusCode()
  {
    // Arrange
    var client = _factory.CreateClient();

    // Act
    var response = await client.GetAsync("/api/metrics");

    // Assert
    response.EnsureSuccessStatusCode();
    Assert.Equal("application/json; charset=utf-8",
        response.Content.Headers.ContentType?.ToString());
  }

  [Fact]
  public async Task GetMetrics_ReturnsExpectedData()
  {
    // Arrange
    var client = _factory.CreateClient();

    // Act
    var response = await client.GetAsync("/api/metrics");
    var content = await response.Content.ReadAsStringAsync();
    var metrics = JsonSerializer.Deserialize<dynamic[]>(content,
        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

    // Assert
    Assert.NotNull(metrics);
    Assert.True(metrics.Length > 0);
  }
}
