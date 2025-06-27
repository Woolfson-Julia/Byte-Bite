import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "../PrivateRoute.jsx";
import { RestrictedRoute } from "../RestrictedRoute.jsx";
// import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout.jsx";

const NotFound = lazy(() => import("../NotFound/NotFound"));

const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const RecipeViewPage = lazy(() =>
  import("../../pages/RecipeViewPage/RecipeViewPage")
);
const AddRecipePage = lazy(() =>
  import("../../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));
const OwnRecipesList = lazy(() =>
  import("../OwnRecipesList/OwnRecipesList.jsx")
);
const FavoriteRecipesList = lazy(() =>
  import("../FavoriteRecipesList/FavoriteRecipesList.jsx")
);
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage.jsx")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="recipes/:id" element={<RecipeViewPage />} />
        <Route
          path="add-recipe"
          element={
            <PrivateRoute
              redirectTo="auth/login"
              component={<AddRecipePage />}
            />
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute redirectTo="auth/login" component={<ProfilePage />} />
          }
        >
          <Route path="own" element={<OwnRecipesList />} />
          <Route path="favorites" element={<FavoriteRecipesList />} />
        </Route>

        <Route
          path="auth/register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegistrationPage />} />
          }
        />
        <Route
          path="auth/login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
