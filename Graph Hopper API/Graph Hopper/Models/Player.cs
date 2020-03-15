using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Graph_Hopper.Models
{
    public class Player
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public byte Grade { get; set; }
        public DateTime Created { get; set; } = DateTime.Now; // Default
        public DateTime LoginFirst { get; set; }
        public DateTime LoginLast { get; set; }
    }
}
