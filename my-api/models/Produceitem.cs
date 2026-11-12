using System.ComponentModel.DataAnnotations;

namespace ZariaAgroFresh.API.Models
{
    public class ProduceItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Sku { get; set; } = string.Empty;

        [Required]
        [MaxLength(120)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(300)]
        public string Description { get; set; } = string.Empty;

        [Range(1, 10000000)]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }

        public bool IsAvailable { get; set; }
    }
}