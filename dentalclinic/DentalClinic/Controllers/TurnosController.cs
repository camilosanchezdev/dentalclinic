using DentalClinic.Context;
using DentalClinic.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
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
        // Generar turnos
        [HttpPost("generar")]
        public ActionResult GenerarTurnos()
        {

            return Ok();
        }
        [HttpGet("getdias/{id_especialista}")]
        public ActionResult GetDiasDisponibles(int id_especialista)
        {
            // Obtengo último turno cargado según especialista
            var ultimoTurno = _context.turnos.OrderByDescending(x => x.horario).FirstOrDefault(x => x.especialista_id.Equals(id_especialista));
            if(ultimoTurno.horario < DateTime.Now)
            {
                ultimoTurno.horario = DateTime.Now;
            }
            if(ultimoTurno != null)
            {
                var especialista = _context.especialistas.FirstOrDefault(x => x.id_especialista.Equals(id_especialista));
                var ultimoDia = ultimoTurno.horario;
                
                List<DateTime> diasDisponibles = new List<DateTime>();
                List<string> diasSemana = new List<string>();

                
                for (int i = 0; i < 7; i++)
                {
                    bool flag = true;
                    ultimoDia = ultimoDia.AddDays(1);
                    // Los tunos se generarán de Lunes a Viernes
                    while(ultimoDia.DayOfWeek == DayOfWeek.Saturday || ultimoDia.DayOfWeek == DayOfWeek.Sunday)
                    {
                        ultimoDia = ultimoDia.AddDays(1);
                    }
                    while (flag)
                    {
                        // Filtro por días en que atiende el especialista
                        for (int j = 0; j < especialista.days.Length; j++)
                        {
                            if (DiaSemana(especialista.days[j]) == ultimoDia.DayOfWeek)
                            {
                                flag = false;
                                break;
                            }
                        }
                        if(flag)
                        {
                            ultimoDia = ultimoDia.AddDays(1);
                        }
                    }
                    var nuevoTurno = new Turnos
                    {
                        horario = ultimoDia
                    };
                    diasDisponibles.Add(nuevoTurno.horario);
                    CultureInfo ci = new CultureInfo("Es-Es");
                    diasSemana.Add(ci.DateTimeFormat.GetDayName(nuevoTurno.horario.DayOfWeek));
                }
                
                return Ok(new { diasSemana, diasDisponibles });
            }

            return Ok("no");
        }
        public DayOfWeek DiaSemana(int dia)
        {
            switch(dia)
            {
                case 0:
                    return DayOfWeek.Monday;
                case 1:
                    return DayOfWeek.Tuesday;
                case 2:
                    return DayOfWeek.Wednesday;
                case 3:
                    return DayOfWeek.Thursday;
                case 4:
                    return DayOfWeek.Friday;
                default:
                    return DayOfWeek.Saturday;
            }
        }
    }
}
