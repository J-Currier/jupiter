using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Graph_Hopper.Models
{
    public class Attempt
    {
        public long Id { get; set; }
        public long PlayerId { get; set; }
        public long LevelId { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime EndedAt { get; set; }
        public string StartPosition { get; set; }
        public string TargetPosition { get; set; }
    }
}
