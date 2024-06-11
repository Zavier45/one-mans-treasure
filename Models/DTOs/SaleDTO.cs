namespace OneMansTreasure.Models.DTOs;

public class SaleDTO
{
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Address { get; set; }
    public int SaleHostId { get; set; }
    public UserProfileDTO SaleHost { get; set; }

}