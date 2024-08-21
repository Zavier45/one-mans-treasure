using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Versioning;

namespace OneMansTreasure.Models;

public class Sale
{
    public int Id { get; set; }
    public string Title { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    [Required]
    [ForeignKey("Neighborhood")]
    public int NeighborhoodId { get; set; }

    public Neighborhood Neighborhood { get; set; }
    [Required]
    public string StreetAddress { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string State { get; set; }
    [Required]
    public string ZipCode { get; set; }
    public string FeaturedItem { get; set; }
    public string FeaturedItemDesc { get; set; }
    [Required]
    [ForeignKey("UserProfile")]
    public int SaleHostId { get; set; }

    public UserProfile SaleHost { get; set; }
    public List<SaleType> SaleTypes { get; set; }

}