import MainLayout from "../components/Layouts/MainLayout";
import ProtectedRoute from "../helpers/ProtectedRoutes";
import "../styles/globals.scss";
function MyApp({ Component, pageProps, router }) {
  const protectedRoutes = ["/"];
  return (
    <ProtectedRoute router={router} protectedRoutes={protectedRoutes}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ProtectedRoute>
  );
}

export default MyApp;
