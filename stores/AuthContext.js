import { createContext, useContext, useEffect, useState } from "react";
import axiosConfig from "../helpers/axiosConfig";
import { useRouter } from "next/router";
import AuthHelper from "../helpers/AuthHelper";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        axiosConfig.defaults.headers.Authorization = `Bearer ${token}`;
        await axiosConfig.get("auth/me").then((response) => {
          setUser(response.data.user);
        });
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (values) => {
    await axiosConfig
      .post("auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        let code = response.data.code;
        if (parseInt(code) !== 200) {
          if (parseInt(code) == 401) {
            throw new Error("Unauthorized");
          }
          if (parseInt(code) == 422) {
            throw new Error("Password or Email are wrong!");
          }
        }

        setUser(response.data);
        Cookies.set("token", response.data.access_token, {
          expires: response.data.expires_in,
        });
        router.push("/employees/" + response.data.user.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    await axiosConfig
      .post(
        "auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        Cookies.remove("token");
        setUser(null);
        delete api.defaults.headers.Authorization;
        router.push("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const auth = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children, router }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated, loading);
  if (loading || (!isAuthenticated && router.pathname !== "/login")) {
    return <div>Loading...</div>;
  }
  return children;
};
