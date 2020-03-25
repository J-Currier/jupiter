using System;

namespace Graph_Hopper.Models
{
    public class FunctionsRun
    {
        public long Id { get; set; }
        public long AttemptId { get; set; }
        public DateTime RanAt { get; set; } = DateTime.Now; // Default
        public string Functions { get; set; }
        public string PlayerPositions { get; set; }
        public string PlayerAcceptablePositions { get; set; }
        public bool Success { get; set; }
        public int Score { get; set; }
    }
}
