using Microsoft.EntityFrameworkCore;

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
