import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { deleteSale, getSaleById } from "../../managers/saleManager";
import { getItemTypes } from "../../managers/itemTypeManager";
import "./SaleDetails.css";

export const SaleDetails = ({ loggedInUser }) => {
  const [saleObj, setSaleObj] = React.useState({});
  const [itemType, setItemType] = React.useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    getSaleById(id).then(setSaleObj);
    getItemTypes(setItemType);
  }, []);

  const handleDelete = () => {
    deleteSale(id).then(() => {
      navigate("/sales");
    });
  };

  return (
    <>
      <div className="parent-details">
        <Card
          className="parent-card"
          style={{
            width: "55rem",
            height: "55rem",
          }}
        >
          <h1>Sale Details</h1>
          <ListGroup className="detail-list">
            <h4>Who: </h4>
            <ListGroupItem className="list-item">
              {`${saleObj?.saleHost?.firstName} ${saleObj?.saleHost?.lastName}`}{" "}
            </ListGroupItem>
            <h4>When:</h4>
            <ListGroupItem className="list-item">
              {" "}
              {`${saleObj?.formattedStartDate} through ${saleObj?.formattedEndDate}`}
            </ListGroupItem>
            <h4>Where:</h4>
            <ListGroupItem className="list-item">{`${saleObj?.address}`}</ListGroupItem>
            <h4>Types of Items Being Sold:</h4>
            <ListGroupItem className="list-item">
              {saleObj.saleTypes?.map((st) => (
                <p key={st.id}>{st.itemType.name}</p>
              ))}
            </ListGroupItem>
          </ListGroup>

          <CardHeader>
            <h2>Featured Sale Item</h2>
          </CardHeader>
          <CardTitle
            className="ft-item-name"
            tag="h4"
            style={{
              width: "100%",
            }}
          >
            {`${saleObj?.featuredItem}`}
          </CardTitle>

          <CardBody>
            <h2>
              Description: <br />
            </h2>
            <h3 className="ft-item-body">{`${saleObj?.featuredItemDesc}`}</h3>
          </CardBody>

          {loggedInUser.id === saleObj?.saleHostId ? (
            <div>
              <ButtonGroup className="edit-group">
                <Button
                  className="edit"
                  onClick={() => {
                    navigate(`/sales/${saleObj.id}/editsale`);
                  }}
                >
                  Edit Sale
                </Button>
              </ButtonGroup>
              <ButtonGroup className="delete-group">
                <Button className="delete" onClick={handleDelete}>
                  Delete Sale
                </Button>
              </ButtonGroup>
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
    </>
  );
};
