import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllSales } from "../../managers/saleManager";
import { Button, ButtonGroup } from "@mui/material";
import "./SaleList.css";

function SaleList() {
  const [sales, setSales] = React.useState([]);

  const navigate = useNavigate();

  const getSaleList = () => {
    getAllSales().then(setSales);
  };

  React.useEffect(() => {
    getSaleList();
  }, []);

  return (
    <>
      <div className="sale-container">
        <h1 className="sale-label">Sales</h1>
        <div className="all-sales">
          <div>
            {sales.map((sale, index) => (
              <div className="sale" key={index}>
                <p>{`${sale.title}`}</p>
                <p>
                  {`This sale is being held at ${sale.streetAddress} in ${sale.city}, ${sale.state} ${sale.zipCode} in the ${sale.neighborhood} neighborhood. This sale begins on ${sale.formattedStartDate} and ends on ${sale.formattedEndDate}.`}
                </p>
                <ButtonGroup>
                  <Button
                    className="details"
                    onClick={() => {
                      navigate(`/sales/${sale.id}`);
                    }}
                  >
                    Details
                  </Button>
                </ButtonGroup>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SaleList;
