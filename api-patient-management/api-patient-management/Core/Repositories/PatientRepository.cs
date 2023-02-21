using System;
using api_patient_management.Data;
using api_patient_management.Models;
using Microsoft.EntityFrameworkCore;

namespace api_patient_management.Repositories
{
    public class PatientRepository : GenericRepository<Patient>, IPatientRepository
    {
        public PatientRepository(apiPatientManagementDbContext dbContext, ILogger logger) : base(dbContext, logger)
        {
        }




        public override async  Task<IEnumerable<Patient>> GetAll()
        {
            try
            {
                var patients = await _dbContext.Patients.ToListAsync();
                var sortedPatients = patients.OrderBy(p => p.LastName).ToList();
                return sortedPatients;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }


        public override void Update(Patient patient)
        {
            _dbSet.Update(patient);
            //send mail function The data it was updated

        }





    }
}

