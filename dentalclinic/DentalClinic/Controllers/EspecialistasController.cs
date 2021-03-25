using System.Linq;
using DentalClinic.Context;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialistasController : ControllerBase
    {
        MaindbContext _context;
        public EspecialistasController(MaindbContext context)
        {
            _context = context;
        }
        [HttpGet("especialistas")]
        public ActionResult GetEspecialistas()
        {
            var especialistas = _context.especialistas.ToList();
            if(especialistas != null)
            {
                return Ok(especialistas);
            }
            return Ok("No encontrado");
        }
        [HttpGet("especialistas/{id}")]
        public ActionResult GetEspecialistas(int id)
        {
            var especialista = _context.especialistas.Where(x => x.id_especialista.Equals(id)).FirstOrDefault();
            if(especialista != null)
            {
                return Ok(especialista);
            }

            return Ok("No encontrado");
        }
    }
}
