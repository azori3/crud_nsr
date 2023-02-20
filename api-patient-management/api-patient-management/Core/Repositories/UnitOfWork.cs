using System;
using api_patient_management.Data;

namespace api_patient_management.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {


        private readonly apiPatientManagementDbContext _dbContext;


        public IPatientRepository Patients { get;  set; }


           public UnitOfWork(
              apiPatientManagementDbContext dbcontext,
              ILoggerFactory loggerFactory )
        {
            _dbContext = dbcontext;
            var _logger = loggerFactory.CreateLogger(categoryName:"Logs");
            Patients = new PatientRepository(_dbContext, _logger);
        }

        public async Task CompleteAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}

