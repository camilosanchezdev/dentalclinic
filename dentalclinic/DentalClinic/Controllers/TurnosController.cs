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
            // Solo los turnos disponibles (client_id != 0)
            var turnos = _context.turnos.Where(x => x.especialista_id.Equals(id) && x.client_id.Equals(0)).ToList();
            if(turnos != null)
            {

                return Ok(turnos);
            }
            return Ok("No");
        }
        
        [HttpGet("turno/{id}")]
        public ActionResult GetTurno(int id)
        {
            var turno = _context.turnos.FirstOrDefault(x => x.id_turno.Equals(id));
            if(turno != null)
            {
                return Ok(turno);
            }
            else
            {
                return Ok(new { status = "error", message = "Turno inexistente" });
            }
            
        }
        [HttpPost("turno/new/{id_turno}/{id_client}")]
        public ActionResult NewTurno(int id_turno, int id_client)
        {
            var turno = _context.turnos.FirstOrDefault(x => x.id_turno.Equals(id_turno));
            if (turno != null)
            {
                turno.client_id = id_client;
                _context.SaveChanges();
                return Ok(new { status = "ok", message = "Turno agendado" });
            }
            else
            {
                return Ok(new { status = "error", message = "Turno inexistente" });
            }

        }
    }
}
