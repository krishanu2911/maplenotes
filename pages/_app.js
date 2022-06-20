import "../styles/globals.css";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
function MyApp({ Component, pageProps }) {
  const route = useRouter();
  const publicPaths = ["/login", "/signup"];
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        {publicPaths.includes(route.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoutes>
            <Component {...pageProps} />
          </ProtectedRoutes>
        )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
