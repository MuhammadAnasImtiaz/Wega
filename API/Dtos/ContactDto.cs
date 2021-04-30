using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ContactDto
    {
        [Required]
        [StringLength(225)]
        public string Name { get; set; }

        [Required]
        [StringLength(225)]
        public string Email { get; set; }

        [Required]
        [StringLength(225)]
        public string Phone { get; set; }
    }
}