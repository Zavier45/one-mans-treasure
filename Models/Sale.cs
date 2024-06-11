using System.ComponentModel.DataAnnotations;

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
    [Required]
    public int SaleHostId { get; set; }
    public UserProfile SaleHost { get; set; }

}