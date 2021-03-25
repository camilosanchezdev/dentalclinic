using DentalClinic.Context;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurnosController : ControllerBase
    {
        MaindbContext _context;
        public TurnosController(MaindbContext context)
        {
            _context = context;
        }
        [HttpGet("turnos/{id}")]
        public ActionResult GetTurnosByEspecialista(int id)
        {
            var turnos = _context.turnos.Where(x => x.especialista_id.Equals(id)).ToList();
            if(turnos != null)
            {

                return Ok(turnos);
            }
            return Ok("No");
        }
        [HttpPost("turnos/nuevo/{id_client}/{id_especialista}")]
        public ActionResult NewTurno(int id_client, int id_especialista)
        {

            return Ok();
        }
    }
}
