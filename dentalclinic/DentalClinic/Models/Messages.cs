using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinic.Models
{
    [Table("messages", Schema = "customers")]
    public class Messages
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_message { get; set; }
        public string message { get; set; }
        public string subject { get; set; }
        public DateTime sent { get; set; }
        public bool read { get; set; }
    }
}
