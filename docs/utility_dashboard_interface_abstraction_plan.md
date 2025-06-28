# 🔌 Utility Provider Interface Abstraction — Design & Implementation Guide

## 🎯 Goal

Abstract utility data fetching logic (via API or scraping) behind a common interface so that:
- New providers are easy to add
- Core logic (dashboard, sync jobs, etc.) doesn’t depend on implementation details
- Scraping/API complexity stays isolated and testable

---

## 🧩 Step 1: Define the Common Interface

### `IUtilityProvider.cs`

```csharp
public interface IUtilityProvider
{
    string ProviderName { get; }

    Task<bool> AuthenticateAsync(UserProviderCredentials credentials);
    Task<UtilityUsageData> GetUsageDataAsync(DateTime startDate, DateTime endDate);
    Task<UtilityBillingData> GetBillingDataAsync(DateTime startDate, DateTime endDate);
    Task<bool> ReauthenticateAsync(UserProviderCredentials credentials);
}

Supporting Types

public class UserProviderCredentials
{
    public string Username { get; set; }
    public string Password { get; set; } // Or OAuth token
}

public class UtilityUsageData
{
    public List<UsageEntry> UsageEntries { get; set; } = new();
}

public class UtilityBillingData
{
    public List<BillingEntry> BillingEntries { get; set; } = new();
}

public class UsageEntry
{
    public DateTime Date { get; set; }
    public decimal KilowattHours { get; set; }
    public decimal Cost { get; set; }
}

public class BillingEntry
{
    public DateTime BillingPeriodStart { get; set; }
    public DateTime BillingPeriodEnd { get; set; }
    public decimal Amount { get; set; }
}


⸻

🧱 Step 2: Implement a Provider

DominionEnergyProvider.cs (Scraping via PlaywrightSharp)

public class DominionEnergyProvider : IUtilityProvider
{
    public string ProviderName => "DominionEnergy";

    public async Task<bool> AuthenticateAsync(UserProviderCredentials credentials)
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(new() { Headless = true });

        var page = await browser.NewPageAsync();
        await page.GotoAsync("https://www.dominionenergy.com/sign-in");

        await page.FillAsync("#username", credentials.Username);
        await page.FillAsync("#password", credentials.Password);
        await page.ClickAsync("button[type='submit']");
        await page.WaitForLoadStateAsync(LoadState.NetworkIdle);

        return !await page.IsVisibleAsync(".login-error");
    }

    public async Task<UtilityUsageData> GetUsageDataAsync(DateTime startDate, DateTime endDate)
    {
        var data = new UtilityUsageData();
        // Replace with actual scraping logic
        data.UsageEntries.Add(new UsageEntry
        {
            Date = DateTime.Today.AddDays(-30),
            KilowattHours = 105,
            Cost = 14.85m
        });

        return data;
    }

    public async Task<UtilityBillingData> GetBillingDataAsync(DateTime startDate, DateTime endDate)
    {
        var data = new UtilityBillingData();
        data.BillingEntries.Add(new BillingEntry
        {
            BillingPeriodStart = DateTime.Today.AddDays(-30),
            BillingPeriodEnd = DateTime.Today,
            Amount = 48.52m
        });

        return data;
    }

    public async Task<bool> ReauthenticateAsync(UserProviderCredentials credentials)
    {
        return await AuthenticateAsync(credentials);
    }
}


⸻

🧩 Step 3: Register All Providers

UtilityProviderFactory.cs

public class UtilityProviderFactory
{
    private readonly Dictionary<string, IUtilityProvider> _providers;

    public UtilityProviderFactory(IEnumerable<IUtilityProvider> providers)
    {
        _providers = providers.ToDictionary(p => p.ProviderName, StringComparer.OrdinalIgnoreCase);
    }

    public IUtilityProvider GetProvider(string providerName)
    {
        if (_providers.TryGetValue(providerName, out var provider))
            return provider;

        throw new InvalidOperationException($"No provider found for '{providerName}'");
    }
}

Dependency Injection Setup (in Program.cs)

builder.Services.AddScoped<IUtilityProvider, DominionEnergyProvider>();
builder.Services.AddScoped<IUtilityProvider, VerizonFiosProvider>();
builder.Services.AddScoped<IUtilityProvider, EnphaseProvider>();
builder.Services.AddSingleton<UtilityProviderFactory>();


⸻

🧵 Step 4: Use in Your API Layer

[ApiController]
[Route("api/[controller]")]
public class UtilityController : ControllerBase
{
    private readonly UtilityProviderFactory _providerFactory;

    public UtilityController(UtilityProviderFactory providerFactory)
    {
        _providerFactory = providerFactory;
    }

    [HttpPost("{providerName}/sync")]
    public async Task<IActionResult> SyncUtility(string providerName, [FromBody] UserProviderCredentials creds)
    {
        var provider = _providerFactory.GetProvider(providerName);

        if (!await provider.AuthenticateAsync(creds))
            return Unauthorized("Login failed.");

        var usage = await provider.GetUsageDataAsync(DateTime.Today.AddMonths(-1), DateTime.Today);
        var billing = await provider.GetBillingDataAsync(DateTime.Today.AddMonths(-1), DateTime.Today);

        // Save to database...

        return Ok(new { usage, billing });
    }
}


⸻

📦 Step 5: Implement Additional Providers
	•	API-based providers (e.g. Enphase):
	•	Use HttpClient for auth/token/data fetching
	•	Parse JSON and map to normalized objects
	•	Cache or refresh tokens via ReauthenticateAsync
	•	Scraping-based providers:
	•	Use PlaywrightSharp or PuppeteerSharp
	•	Be robust to layout changes, handle errors
	•	Always fail safely and report meaningful errors to the user

⸻

✅ Benefits of This Pattern
	•	Consistent interface for all utility data sources
	•	Easily testable and mockable
	•	Supports both scraping and API integrations
	•	Makes dashboard/backend code provider-agnostic
	•	Easy to expand as you support more utilities

⸻

🧪 Optional Enhancements
	•	Encrypt credentials at rest
	•	Store raw provider responses for debugging
	•	Add retry and circuit-breaker logic for flaky providers
	•	Expose sync logs or provider health in admin UI
