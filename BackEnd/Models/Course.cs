using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Course
    {
        public Course()
        {
            Takes = new HashSet<Take>();
        }

        public int Id { get; set; }
      
        public int DeptIdFk { get; set; }
        public int TeacherIdFk { get; set; }
        public virtual Subject DeptIdFkNavigation { get; set; }
        public virtual Teacher TeacherIdFkNavigation { get; set; }



     
        public virtual ICollection<Take> Takes { get; set; }
    }
}
