using System;
using System.ComponentModel.DataAnnotations;
using api_patient_management.CustomValidation;

namespace api_patient_management.Models
{
	public class Patient
	{

		public Guid Id { get; set; }
      
        [StringLength(50, MinimumLength = 2)]
        public string? FirstName { get; set; }
      
        public string? LastName { get; set; }
   
        public string? Email { get; set; }
        [Phone]
        public long PhoneNumber { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "My Date")]
        [DateNotInFuture]
        public DateTime? DateBirth { get; set; }

    }

   
}


