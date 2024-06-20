namespace OneMansTreasure.Models.DTOs;

public class CreateSaleDTO
{

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Address { get; set; }
    public string FeaturedItem { get; set; }
    public string FeaturedItemDesc { get; set; }
    public int SaleHostId { get; set; }
    public int[] SaleTypes { get; set; }

}