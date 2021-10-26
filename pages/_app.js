import MainLayout from "../components/Layouts/MainLayout";
import { ProtectRoute } from "../stores/AuthContext";
import "../styles/globals.scss";
import { AuthContextProvider, useAuth } from "../stores/AuthContext";
function MyApp({ Component, pageProps, router }) {
  return (
    <AuthContextProvider>
      <ProtectRoute router={router}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProtectRoute>
    </AuthContextProvider>
  );
}

export default MyApp;
