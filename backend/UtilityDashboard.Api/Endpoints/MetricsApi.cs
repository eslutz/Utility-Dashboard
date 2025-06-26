using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace UtilityDashboard.Api.Endpoints;

public static class MetricsApi
{
  public static void MapMetricsApi(this WebApplication app)
  {
    app.MapGet("/api/metrics", async (HttpContext context) =>
    {
      var metrics = new[]
          {
                new { Name = "CPU Usage", Value = "15%" },
                new { Name = "Memory Usage", Value = "1.2 GB" },
                new { Name = "Disk Space", Value = "80%" }
        };
      await context.Response.WriteAsJsonAsync(metrics);
    });
  }
}
