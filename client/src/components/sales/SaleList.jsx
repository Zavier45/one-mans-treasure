import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllSales } from "../../managers/saleManager";
import { Button } from "reactstrap";
import "./SaleList.css";

function SaleList() {
  const [sales, setSales] = React.useState([]);
  const [error, setError] = React.useState(null);

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
        <h2>Sales</h2>
        <div>
          {sales.map((sale, index) => (
            <div className="sale" key={index}>
              <p>
                {`This sale is being held at ${sale.address} beginning on ${sale.formattedStartDate} and ending on ${sale.formattedEndDate}.`}
              </p>
              <Button
                onClick={() => {
                  navigate(`/sales/${sale.id}`);
                }}
              >
                Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default SaleList;
