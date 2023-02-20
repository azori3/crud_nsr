using System;
using System.ComponentModel.DataAnnotations;

namespace api_patient_management.CustomValidation
{

        public class DateNotInFuture : ValidationAttribute
        {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {


            if (value is null)
            {
                return new ValidationResult("Date cannot be null.");
            }


            if (value is DateTime date && date > DateTime.Now)
            {
                return new ValidationResult("Date cannot be in the future.");
            }

            return ValidationResult.Success!;
        }
        }
    
}

