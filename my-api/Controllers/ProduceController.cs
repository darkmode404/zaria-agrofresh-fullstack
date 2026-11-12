using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZariaAgroFresh.API.Models;

namespace ZariaAgroFresh.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProduceController : ControllerBase
    {
        private readonly AgroDbContext _context;

        public ProduceController(AgroDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProduceItem>>> GetAll()
        {
            return Ok(await _context.ProduceItems.ToListAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProduceItem>> GetById(int id)
        {
            var item = await _context.ProduceItems.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<ProduceItem>> Create([FromBody] ProduceItem item)
        {
            _context.ProduceItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProduceItem item)
        {
            if (id != item.Id) return BadRequest("Route ID and payload ID must match.");

            var exists = await _context.ProduceItems.AnyAsync(p => p.Id == id);
            if (!exists) return NotFound();

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.ProduceItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.ProduceItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}