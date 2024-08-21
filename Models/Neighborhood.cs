using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OneMansTreasure.Models.DTOs;

namespace OneMansTreasure.Models;

public class Neighborhood
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public List<Sale> Sales { get; set; }
}