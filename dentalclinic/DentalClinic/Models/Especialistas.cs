using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinic.Models
{
    [Table("especialistas", Schema = "customers")]
    public class Especialistas
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_especialista { get; set; }
        public string name { get; set; }
        public int[] days { get; set; }
        public DateTime since { get; set; }
        public DateTime until { get; set; }
        public string speciality { get; set; }
        public char gender { get; set; }
    }
}
