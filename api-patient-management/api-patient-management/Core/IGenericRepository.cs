using System;
using System.Threading.Tasks;

namespace api_patient_management.Repositories
{
	public interface IGenericRepository<T> where T : class
    {

        Task<T?> Get(Guid id);
        Task<IEnumerable<T>> GetAll();
        Task<T> Add(T entity);
        void Delete(T entity);
        void Update(T entity);

    }
}

