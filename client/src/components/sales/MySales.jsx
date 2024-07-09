import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllSales } from "../../managers/saleManager";
import { Button, ButtonGroup } from "@mui/material";
import "./SaleList.css";

export const UserSales = ({ loggedInUser }) => {
  const [userSales, setUserSales] = React.useState([]);
  const navigate = useNavigate();

  const getUserSales = () => {
    getAllSales().then(setUserSales);
  };

  React.useEffect(() => {
    getUserSales();
  }, []);

  return (
    <div className="sale-container">
      <h1 className="sale-label">My Sales</h1>
      <div className="all-sales">
        <div>
          {userSales.map((sale, index) =>
            loggedInUser.id === sale.saleHostId ? (
              <div className="sale" key={index}>
                <p>
                  {`Address: ${sale.address}
                  Date: ${sale.formattedStartDate} through ${sale.formattedEndDate}`}
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
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSales;
