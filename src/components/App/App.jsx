import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
import Loader from "../Loader/Loader";

import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";

import SavedRecipes from "../SavedRecipes/SavedRecipes";
import MyRecipes from "../MyRecipesList/MyRecipesList";

const Layout = lazy(() => import("../Layout/Layout"));

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

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
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);
  useEffect(() => {
    if (accessToken) {
      dispatch(refreshUser());
    }
  }, [accessToken, dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
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
            path="profile"
            element={
              <PrivateRoute
                component={<ProfilePage />} // ProfilePage должен содержать <Outlet />
                redirectTo="/auth/login"
              />
            }
          >
            <Route path="own" element={<MyRecipes />} />
            <Route path="favorites" element={<SavedRecipes />} />
          </Route>
          {/* Обмежені роути - тільки для незалогінених */}
          <Route
            path="auth/:authType"
            element={
              <RestrictedRoute component={<AuthPage />} redirectTo="/" />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}