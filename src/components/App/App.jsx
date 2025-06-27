import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
import Loader from "../Loader/Loader";

const Layout = lazy(() => import("../Layout/Layout"));
const NotFound = lazy(() => import("../NotFound/NotFound"));

const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const RecipeViewPage = lazy(() =>
  import("../../pages/RecipeViewPage/RecipeViewPage")
);
const AddRecipePage = lazy(() =>
  import("../../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("../../pages/AuthPage/AuthPage"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="recipes/:id" element={<RecipeViewPage />} />

          {/* Приватні роути - тільки для залогінених */}
          <Route
            path="add-recipe"
            element={
              <PrivateRoute
                component={<AddRecipePage />}
                redirectTo="/auth/login"
              />
            }
          />
          <Route
            path="profile/:recipeType"
            element={
              <PrivateRoute
                component={<ProfilePage />}
                redirectTo="/auth/login"
              />
            }
          />

          {/* Обмежені роути - тільки для незалогінених */}
          <Route
            path="auth/:authType"
            element={
              <RestrictedRoute component={<AuthPage />} redirectTo="/" />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
