import MainLayout from "../components/Layouts/MainLayout";
import { ProtectRoute } from "../stores/AuthContext";
import "../styles/globals.scss";
import { AuthContextProvider } from "../stores/AuthContext";
function MyApp({ Component, pageProps, router }) {
  return (
    <AuthContextProvider>
      <ProtectRoute router={router}>
        <MainLayout router={router}>
          <Component router={router} {...pageProps} />
        </MainLayout>
      </ProtectRoute>
    </AuthContextProvider>
  );
}

export default MyApp;
