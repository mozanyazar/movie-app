import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
        <Route path="/createAccount" element={<CreateAccount />} />

        <Route
          path="/signIn"
          element={
            <Suspense fallback={<LoadingAnimation />}>{<SignIn />}</Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
