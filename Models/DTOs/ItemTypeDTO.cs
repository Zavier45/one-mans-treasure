namespace OneMansTreasure.Models.DTOs;

public class ItemTypeDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsChecked { get; set; } = false;
}