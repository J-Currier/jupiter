using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Graph_Hopper.Models
{
    public class PlayersContext : DbContext
    {
        public PlayersContext(DbContextOptions<PlayersContext> options)
            : base(options)
        {
        }

        public DbSet<Player> Players { get; set; }
    }
}
