using DentalClinic.Models;
using Microsoft.EntityFrameworkCore;

namespace DentalClinic.Context
{
    public class MaindbContext : DbContext
    {
        public MaindbContext(DbContextOptions<MaindbContext> options) : base(options) {}
        public DbSet<Clients> clients { get; set; }
        public DbSet<Messages> messages { get; set; }
        public DbSet<Roles> roles { get; set; }
        public DbSet<Turnos> turnos { get; set; }
        public DbSet<Users> users { get; set; }
        public DbSet<Especialistas> especialistas { get; set; }
    }
}
