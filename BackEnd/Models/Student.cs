using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Student
    {
        public Student()
        {
            
      
            Takes = new HashSet<Take>();
 
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNo { get; set; }
        public string EmailAddress { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
   
      
            public virtual ICollection<Take> Takes { get; set; }

    
    }
}
