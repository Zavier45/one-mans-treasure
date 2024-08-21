using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OneMansTreasure.Models.DTOs;

public class NeighborhoodDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Sale> Sales { get; set; }
}