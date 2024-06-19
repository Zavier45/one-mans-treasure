import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SaleList from "./sales/SaleList";
import { SaleDetails } from "./sales/SaleDetails";
import { NewSale } from "./sales/CreateSale";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <>Home Page</>
            </AuthorizedRoute>
          }
        />
        <Route path="/sales">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <SaleList />
              </AuthorizedRoute>
            }
          />
          <Route path=":id" element={<SaleDetails />} />
        </Route>
        <Route path="/newsale">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <NewSale loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="*" element={<p>Nothing to see here, folks.</p>} />
      </Route>
    </Routes>
  );
}
