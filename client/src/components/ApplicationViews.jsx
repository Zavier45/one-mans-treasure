import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SaleList from "./sales/SaleList";
import { SaleDetails } from "./sales/SaleDetails";
import { NewSale } from "./sales/CreateSale";
import { EditSale } from "./sales/EditSale";

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
                <SaleList loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route path=":id">
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <SaleDetails loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
            <Route path="editsale">
              <Route
                index
                element={
                  <AuthorizedRoute loggedInUser={loggedInUser}>
                    <EditSale loggedInUser={loggedInUser} />
                  </AuthorizedRoute>
                }
              />
            </Route>
          </Route>
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
