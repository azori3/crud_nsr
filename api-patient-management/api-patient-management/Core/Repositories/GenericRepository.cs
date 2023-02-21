using System;
using api_patient_management.Data;
using Microsoft.EntityFrameworkCore;

namespace api_patient_management.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {


        internal readonly apiPatientManagementDbContext _dbContext;
        internal DbSet<T> _dbSet;
        protected readonly ILogger _logger;
       



        public GenericRepository(apiPatientManagementDbContext dbContext,ILogger logger)
        {

            _dbContext = dbContext;
            _logger = logger;
            this._dbSet = _dbContext.Set<T>();

        }

 

        public virtual async Task<IEnumerable<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> Add(T entity)
        {
             await _dbSet.AddAsync(entity);
             return entity;

        }

        public async Task<T?> Get(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }




        public virtual void Update(T entity)
        {
             _dbSet.Update(entity);

        }

        public async Task<T?> Get(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

       
    }
}

