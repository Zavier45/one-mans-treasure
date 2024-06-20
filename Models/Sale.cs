using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OneMansTreasure.Models;

public class Sale
{
    public int Id { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    [Required]
    public string Address { get; set; }
    public string FeaturedItem { get; set; }
    public string FeaturedItemDesc { get; set; }
    [Required]
    [ForeignKey("UserProfile")]
    public int SaleHostId { get; set; }

    public UserProfile SaleHost { get; set; }
    public List<SaleType> SaleTypes { get; set; }

}