# Zaria AgroFresh Market — Full-Stack Web Application

A decoupled full-stack Nigerian agricultural marketplace built with a custom **ASP.NET Core Web API (.NET 10.0)** backend and a responsive **Vanilla JavaScript (ES6+)** frontend.

---

## System Architecture

The application follows a **decoupled client-server architecture**, separating the presentation layer from the data and business logic layer:

```text
StudentStarter/
├── client/                         # Frontend UI (Static Web Server on Port 5500)
│   ├── index.html                  # Semantic marketplace interface
│   ├── styles.css                  # Responsive styling & layout
│   └── app.js                      # Asynchronous Fetch API client & state management
│
├── my-api/                         # Custom Backend API (Kestrel Server on Port 5100)
│   ├── Controllers/
│   │   └── ProduceController.cs    # RESTful CRUD endpoints (/api/produce)
│   ├── Models/
│   │   ├── ProduceItem.cs          # Entity model with DataAnnotations validation
│   │   └── AgroDbContext.cs        # EF Core DbContext with 17 seeded NGN items
│   ├── Program.cs                  # DI container, EF In-Memory setup & CORS policy
│   └── ZariaAgroFresh.API.csproj   # .NET 10.0 project manifest
│
├── .gitignore                      # Excludes build artifacts (bin/, obj/)
└── README.md                       # Project documentation
