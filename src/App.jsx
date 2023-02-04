import React, { Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Message from "./components/Message";
import LoadingAnimation from "./components/LoadingAnimation";
import { ApiContextProvider } from "./store/ApiContext";
function App() {
  const SignIn = React.lazy(() => import("./pages/SignIn"));
  const Home = React.lazy(() => import("./pages/Home"));
  const DetailPage = React.lazy(() => import("./pages/DetailPage"));
  const { movieName, movieId } = useParams();
  return (
    <>
      <Message />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingAnimation />}>
              {
                <ApiContextProvider>
                  <Home />
                </ApiContextProvider>
              }
            </Suspense>
          }
        />
        <Route
          path="/createAccount"
          element={
            <ProtectedRoute>
              <CreateAccount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signIn"
          element={
            <Suspense fallback={<LoadingAnimation />}>
              {
                <ProtectedRoute>
                  <SignIn />
                </ProtectedRoute>
              }
            </Suspense>
          }
        />
        <Route path="movies/:movieName">
          <Route
            path=":movieId"
            element={
              <Suspense fallback={<LoadingAnimation />}>
                <DetailPage />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
