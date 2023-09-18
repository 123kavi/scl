using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class ClassRoom
    {
        public ClassRoom()
        {
            Alocates = new HashSet<Alocate>();
        }

        public int Id { get; set; }
        public string CLassName { get; set; }
        
        public virtual ICollection<Alocate> Alocates { get; set; }

    }
}