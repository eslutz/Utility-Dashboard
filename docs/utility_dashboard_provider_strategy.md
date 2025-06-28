# 🧩 Utility Provider Integration Strategy (Simplified)

This project supports both **real** and **mock/demo** data for utility providers. Provider classes are designed to:

- ✅ Keep the codebase public and safe (no secrets or scraping by default)
- ✅ Allow the app to work out of the box with demo data
- ✅ Enable real scraping/API access only for **subscribed users**

---

## 🔐 Real vs. Mock Data Strategy

### ✅ Core Logic (Minimalist Approach)

Real data is only fetched when:

- `user.IsSubscribed == true`

Otherwise, providers return realistic **mock/demo data**.

---

## 🧑‍💻 User Context Model

```csharp
public class AppUser
{
    public string Id { get; set; }
    public bool IsSubscribed { get; set; }       // True = allow real data access
}
```

---

## 🔧 Provider Class Example

```csharp
public class DominionEnergyProvider : IUtilityProvider
{
    public string ProviderName => "DominionEnergy";

    public async Task<UtilityUsageData> GetUsageDataAsync(DateTime start, DateTime end, AppUser user)
    {
        if (!user.IsSubscribed)
        {
            return FakeUsageData();
        }

        // Real scraping or API logic here
    }

    private UtilityUsageData FakeUsageData()
    {
        return new UtilityUsageData
        {
            UsageEntries = new List<UsageEntry>
            {
                new() { Date = DateTime.Today.AddDays(-30), KilowattHours = 100, Cost = 12.50m },
                new() { Date = DateTime.Today.AddDays(-29), KilowattHours = 105, Cost = 13.10m },
            }
        };
    }
}
```

---

## 🧪 Development Behavior

- No need to manage any environment flags or global switches
- All mock data is served unless the user is marked `IsSubscribed = true`
- Safe for GitHub and developer testing

---

## 🎯 Summary

- `user.IsSubscribed` is the **only flag** used to control access to real provider data
- All provider implementations should fall back to mock data otherwise
- This keeps things simple, safe, and monetization-ready
