

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseManagementAPI.Models;

namespace CourseManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassRoomsController : ControllerBase
    {
        private readonly CourseManagementDBContext _context;

        public ClassRoomsController(CourseManagementDBContext context)
        {
            _context = context;
        }

        // GET: api/ClassRooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassRoom>>> GetClassRooms()
        {
            return await _context.ClassRooms.ToListAsync();
        }

        // GET: api/ClassRooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassRoom>> GetClassRoom(int id)
        {
            var classRoom = await _context.ClassRooms.Include(t => t.Alocates).FirstOrDefaultAsync(t => t.Id == id);

            if (classRoom == null)
            {
                return NotFound();
            }

            return classRoom;
        }

        // PUT: api/ClassRooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassRoom(int id, ClassRoom classRoom)
        {
            if (id != classRoom.Id)
            {
                return BadRequest();
            }

            _context.Entry(classRoom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassRoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ClassRooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClassRoom>> PostClassRoom(ClassRoom classRoom)
        {
            _context.ClassRooms.Add(classRoom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassRoom", new { id = classRoom.Id }, classRoom);
        }

        // DELETE: api/ClassRooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassRoom(int id)
        {
            var classRoom = await _context.ClassRooms.FindAsync(id);
            if (classRoom == null)
            {
                return NotFound();
            }

            _context.ClassRooms.Remove(classRoom);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ClassRoomExists(int id)
        {
            return _context.ClassRooms.Any(e => e.Id == id);
        }
    }
}
