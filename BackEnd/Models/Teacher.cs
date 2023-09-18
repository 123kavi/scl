using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Teacher
    {
        public Teacher()
        {
            Courses = new HashSet<Course>();
            Alocates = new HashSet<Alocate>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNo { get; set; }
        public string EmailAddress { get; set; }
         public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Alocate> Alocates { get; set; }

    }
}
