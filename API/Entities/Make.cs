using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Make
    {
        
        public int Id { get; set; }
        [Required]
        [StringLength(225)]
        public string Name { get; set; }
        public List<Model> Models { get; set; } = new List<Model>();
    }
}