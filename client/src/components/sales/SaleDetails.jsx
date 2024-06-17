import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { getSaleById } from "../../managers/saleManager";
import { getItemTypes } from "../../managers/itemTypeManager";

export const SaleDetails = ({ loggedInUser }) => {
  const [saleObj, setSaleObj] = React.useState({});
  const [itemType, setItemType] = React.useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    getSaleById(id).then(setSaleObj);
    getItemTypes(setItemType);
  }, []);

  return (
    <>
      <div className="details-container">
        <h2>Sale Details</h2>
        <div className="single-sale-container">
          <h3>{`Who: ${saleObj?.saleHost?.firstName} ${saleObj?.saleHost?.lastName}`}</h3>
          <h3>{`When: ${saleObj?.formattedStartDate} through ${saleObj?.formattedEndDate}`}</h3>
          <h3>{`Where: ${saleObj?.address}`}</h3>
          <h3>Types of Items Being Sold:</h3>
          {saleObj.saleTypes?.map((st) => (
            <p key={st.id}>{st.itemType.name}</p>
          ))}
        </div>
      </div>
    </>
  );
};
