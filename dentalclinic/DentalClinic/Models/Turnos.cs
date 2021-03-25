using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinic.Models
{
    [Table("turnos", Schema = "customers")]
    public class Turnos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_turno { get; set; }
        public DateTime horario { get; set; }
        public int client_id { get; set; }
        public int especialista_id { get; set; }
    }
}
