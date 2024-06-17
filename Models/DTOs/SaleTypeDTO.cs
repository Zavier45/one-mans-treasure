namespace OneMansTreasure.Models.DTOs;

public class SaleTypeDTO
{
    public int Id { get; set; }
    public int SaleId { get; set; }
    public SaleDTO Sale { get; set; }
    public int ItemTypeId { get; set; }
    public ItemTypeDTO ItemType { get; set; }
}