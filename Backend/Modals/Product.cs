using System.ComponentModel.DataAnnotations;

namespace smartcore.Modals
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Number { get; set; }
    }
}
