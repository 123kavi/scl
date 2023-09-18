      using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseManagementAPI.Models;

namespace CourseManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlocatesController : ControllerBase
    {
        private readonly CourseManagementDBContext _context;

        public AlocatesController(CourseManagementDBContext context)
        {
            _context = context;
        }
      
         
       // GET: api/Subjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alocate>>> GetAlocates()
        {
            return await _context.Alocates.ToListAsync();
        }
        // GET: api/Alocates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alocate>> GetAlocate(int id)
        {
            var alocate = await _context.Alocates
                .Include(t => t.Takes)
                .ThenInclude(t => t.TeacherIdFkNavigation)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (alocate == null)
            {
                return NotFound();
            }

            return alocate;
        }

        // PUT: api/Alocates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlocate(int id, Alocate alocate)
        {
            if (id != alocate.Id)
            {
                return BadRequest();
            }

            _context.Entry(alocate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlocateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Alocates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Alocate>> PostAlocate([Bind("Id,DeptIdFk,TeacherIdFk")] Alocate alocate)
        {
            _context.Alocates.Add(alocate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlocate", new { id = alocate.Id }, alocate);
        }

        // DELETE: api/Alocates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlocate(int id)
        {
            var alocate = await _context.Alocates.FindAsync(id);
            if (alocate == null)
            {
                return NotFound();
            }

            _context.Alocates.Remove(alocate);
            await _context.SaveChangesAsync();

            return Ok();
        }


                    private bool AlocateExists(int id)
        {
            return _context.Alocates.Any(e => e.Id == id);
        }
    }
}
