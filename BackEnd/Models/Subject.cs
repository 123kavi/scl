using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Subject
    {
        public Subject()
        {
            Courses = new HashSet<Course>();
          
        }

        public int Id { get; set; }
        public string SubjectName { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}
