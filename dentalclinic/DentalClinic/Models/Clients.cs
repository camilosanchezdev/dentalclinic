using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinic.Models
{
    [Table("clients", Schema = "customers")]
    public class Clients
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_client { get; set; }
        public int dni { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public string lastname { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
    }
}
