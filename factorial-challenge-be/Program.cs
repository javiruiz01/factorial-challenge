using factorial_challenge.Models;
using factorial_challenge.Repositories;
using factorial_challenge.Services;

var builder = WebApplication.CreateBuilder(args);

const string allowedOrigins = "AllowedOrigins";
// Add services to the container.
builder.Services.AddScoped<IMetricsService, MetricsService>();
builder.Services.AddScoped<IMetricsRepository, MetricsRepository>();

builder.Services.AddCors(options => options
    .AddPolicy(
        allowedOrigins,
        policyBuilder => policyBuilder
            .WithOrigins(builder.Configuration[allowedOrigins] ?? string.Empty)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()));

builder.Services
    .Configure<DatabaseSettings>(builder.Configuration.GetSection(nameof(DatabaseSettings)));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(allowedOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();