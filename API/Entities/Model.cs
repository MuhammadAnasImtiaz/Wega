using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Models")]
    public class Model
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(225)]
        public string Name { get; set; }
        public Make Make { get; set; }
        public int MakeId { get; set; }
        
    }
}