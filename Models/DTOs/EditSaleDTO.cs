namespace OneMansTreasure.Models.DTOs;

public class EditSaleDTO
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Address { get; set; }
    public int[] SaleTypes { get; set; }

}