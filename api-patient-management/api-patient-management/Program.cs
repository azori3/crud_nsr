using api_patient_management.Data;
using api_patient_management.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<apiPatientManagementDbContext>(options => options.UseInMemoryDatabase("PatientsDb"));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("corsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:8100")
            .AllowAnyHeader()
            .AllowAnyMethod();
    }); 
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseCors("corsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

