using Microsoft.EntityFrameworkCore;

namespace Graph_Hopper.Models
{
    public class AttemptsContext : DbContext
    {
        public AttemptsContext(DbContextOptions<AttemptsContext> options)
            : base(options)
        {
        }

        public DbSet<Attempt> Attempts { get; set; }
    }
}
