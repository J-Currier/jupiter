using System;

namespace Graph_Hopper.Models
{
    public class Player
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public byte Grade { get; set; }
        public DateTime Created { get; set; } = DateTime.Now; // Default
        public DateTime LoginFirst { get; set; } = DateTime.Now; // Default
        public DateTime LoginLast { get; set; }
    }
}
