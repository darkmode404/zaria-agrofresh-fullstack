using Microsoft.EntityFrameworkCore;
using ZariaAgroFresh.API.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AgroDbContext>(options =>
    options.UseInMemoryDatabase("ZariaAgroFreshDb"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5500", "http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AgroDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();