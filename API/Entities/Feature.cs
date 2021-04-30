using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Feature
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(225)]
        public string Name { get; set; }
    }
}