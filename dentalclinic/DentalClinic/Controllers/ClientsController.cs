using DentalClinic.Context;
using DentalClinic.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        MaindbContext _context;
        public ClientsController(MaindbContext context)
        {
            _context = context;
        }

        [HttpGet("clients/{dni}")]
        public ActionResult searchByDni(int dni)
        {
            var client = _context.clients.FirstOrDefault(x => x.dni.Equals(dni));
            if(client != null)
            {
                return Ok(client);
            }
            else
            {
                return Ok(new { status = "error", message = "Cliente inexistente" });
            }
            
        }
        [HttpPost("clients/new")]
        public ActionResult newUser([FromForm] int dni, [FromForm] string name, [FromForm] string lastname, [FromForm] string email, [FromForm] string phone, [FromForm] string address)
        {
            var dniExist = _context.clients.FirstOrDefault(x => x.dni.Equals(dni));
            if (dniExist != null)
                return Ok(new { status = "error", message = "DNI existente" });

            Clients newClient = new Clients
            {
                dni = dni,
                name = name,
                lastname = lastname,
                email = email,
                phone = phone,
                address = address
            };
            _context.clients.Add(newClient);
            _context.SaveChanges();
            return Ok(new { status = "ok"});
        }
        [HttpPost("clients/update")]
        public ActionResult updateUser([FromForm] int dni, [FromForm] string name, [FromForm] string lastname, [FromForm] string email, [FromForm] string phone, [FromForm] string address)
        {
            var client = _context.clients.FirstOrDefault(x => x.dni.Equals(dni));
            if (client != null)
            {
                client.dni = dni;
                client.name = name;
                client.lastname = lastname;
                client.email = email;
                client.phone = phone;
                client.address = address;
                _context.SaveChanges();
                return Ok(new { status = "ok" });
            }
            else
            {
                return Ok(new { status = "error", message = "DNI inexistente" });
            }
        }

    }
}
