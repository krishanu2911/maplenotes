import "../styles/globals.css";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { AuthContextProvider } from "../context/AuthContext";
import { UserDataContextProvider } from "../context/UserDataContext";
import { Sidebar } from "../components/Sidebar";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
function MyApp({ Component, pageProps }) {
  const route = useRouter();
  const publicPaths = ["/login", "/signup"];
  return (
    <>
      <AuthContextProvider>
        <UserDataContextProvider>
          
          {publicPaths.includes(route.pathname) ? (
            <div className=" bg-slate-400 min-h-screen flex flex-col md:flex-row">
            <Component {...pageProps} />
            </div>
          ) : (
            <ProtectedRoutes>
              <Navbar />
              <div className=" bg-slate-400 min-h-screen flex flex-col md:flex-row">
              <Sidebar />
              <div className="w-full">
              <Component {...pageProps} />
              </div>
              </div>
            </ProtectedRoutes>

          )}
        </UserDataContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
