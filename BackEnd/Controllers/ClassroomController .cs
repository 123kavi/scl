using CourseManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
namespace CourseManagementAPI.Controllers
{
    [Route("api/classroom")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private readonly CourseManagementDBContext _context;

        public ClassroomController(CourseManagementDBContext context)
        {
            _context = context;
        }

        [HttpGet("{classroomId}/subjects-teachers")]
        public IActionResult GetSubjectsAndTeachers(int classroomId)
        {
            var classroom = _context.ClassRooms.Find(classroomId);

            if (classroom == null)
            {
                return NotFound("Classroom not found");
            }

            var teacherId = classroom.Id;

            var courses = _context.Courses
                .Where(c => c.Id == teacherId)
                .ToList();

            var subjectIds = courses.Select(c => c.Id).ToList();

            var subjects = _context.Subjects
                .Where(s => subjectIds.Contains(s.Id))
                .ToList();

            var teacher = _context.Teachers.Find(teacherId);

            var result = new
            {
                Teacher = teacher,
                Subjects = subjects
            };

            return Ok(result);
        }
    }

}
