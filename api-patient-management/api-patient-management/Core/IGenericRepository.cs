using System;
namespace api_patient_management.Repositories
{
	public interface IGenericRepository<T> where T : class
    {

        Task<T?> Get(Guid id);
        Task<IEnumerable<T>> GetAll();
        Task<T> Add(T entity);
        bool Delete(T entity);
        bool Update(T entity);

    }
}

