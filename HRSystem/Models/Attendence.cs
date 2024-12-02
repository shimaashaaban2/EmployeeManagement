namespace HRSystem.Models
{
    public class Attendence
    {
        public int ID { get; set; }
        public string InTime { get; set; }
        public string OutTime { get; set; }
        public string InTime_Lanch { get; set; }
        public string OutTime_Lanch { get; set; }
        public DateTime? Attend_Date { get; set; }
        public string Statuss { get; set; }
        public int? EmpID { get; set; }

        public virtual Employee Employee { get; set; }
    }
}
