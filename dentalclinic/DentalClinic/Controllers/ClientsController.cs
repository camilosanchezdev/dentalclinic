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
            return Ok("NO");
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

       
    }
}
