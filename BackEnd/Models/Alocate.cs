using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Alocate
    {
        public Alocate()
        {
            Takes = new HashSet<Take>();
        }

        public int Id { get; set; }

        public int ClassIdFk { get; set; }
        public int TeacherIdFk { get; set; }
        public virtual ClassRoom ClassIdFkNavigation { get; set; }
        public virtual Teacher TeacherIdFkNavigation { get; set; }

        public virtual ICollection<Take> Takes { get; set; }
    }
}
