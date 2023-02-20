using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using api_patient_management.Data;
using api_patient_management.Models;
using api_patient_management.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_patient_management.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : Controller
    {

        // private readonly api_patient_managementDbContext dbContext;



        private readonly IUnitOfWork _unitOfWork;
        public PatientsController(IUnitOfWork unitOfWork)
        {

            _unitOfWork = unitOfWork;

        }





        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _unitOfWork.Patients.GetAll();
            var sortedPatients = patients.OrderBy(p => p.LastName).ToList();
            return Ok(sortedPatients);
        }


        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetPatient([FromRoute] Guid id)
        {
            var patient = await _unitOfWork.Patients.Get(id);

            if(patient == null)
            {

                return NotFound();
            }

            return Ok(patient);
        }



        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody] AddPatientRequest addPatientRequest
 )
        {

            var patient = new Patient()
            {
                Id = Guid.NewGuid(),
                DateBirth = addPatientRequest.DateBirth,
                FirstName = addPatientRequest.FirstName,
                LastName = addPatientRequest.LastName,
                PhoneNumber = addPatientRequest.PhoneNumber,
                Email = addPatientRequest.Email
            };


            await _unitOfWork.Patients.Add(patient);
            await _unitOfWork.CompleteAsync();
            return Ok(patient);


        }


        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdatePatient([FromRoute] Guid id, UpdatePatientRequest updatePatientRequest)
        {

          var patient = await _unitOfWork.Patients.Get(id);

            if(patient != null)
            {
                patient.DateBirth = updatePatientRequest.DateBirth;
                patient.FirstName = updatePatientRequest.FirstName;
                patient.LastName = updatePatientRequest.LastName;
                patient.PhoneNumber = updatePatientRequest.PhoneNumber;
                patient.Email = updatePatientRequest.Email;

                await _unitOfWork.CompleteAsync();
                return Ok(patient);

            }


            return NotFound();


        }


        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeletePatient([FromRoute] Guid id)
        {
            var patient = await _unitOfWork.Patients.Get(id);

            if (patient != null)
            {
                _unitOfWork.Patients.Delete(patient);
                await _unitOfWork.CompleteAsync();
                return Ok(patient);
            }
            return NotFound();
          
        }



    }
}

