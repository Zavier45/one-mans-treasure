using System.ComponentModel.DataAnnotations;

namespace OneMansTreasure.Models;

public class SaleType
{
    public int Id { get; set; }
    [Required]
    public int SaleId { get; set; }
    public Sale Sale { get; set; }
    [Required]
    public int ItemTypeId { get; set; }
    public ItemType ItemType { get; set; }
}