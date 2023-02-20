using System;
using api_patient_management.Models;
using Microsoft.EntityFrameworkCore;

namespace api_patient_management.Data
{
    public class apiPatientManagementDbContext : DbContext
    {
        public apiPatientManagementDbContext(DbContextOptions options) : base(options)
        {
        }


        public DbSet<Patient> Patients { get; set; }
    }
}

