using System;
namespace api_patient_management.Repositories
{
	public interface IUnitOfWork
	{

		IPatientRepository Patients { get;  }

		Task CompleteAsync();
	}
}

