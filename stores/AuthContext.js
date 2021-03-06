import { createContext, useContext, useEffect, useState } from "react";
import axiosConfig from "../helpers/axiosConfig";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        axiosConfig.defaults.headers.Authorization = `Bearer ${token}`;
        await axiosConfig
          .get("auth/me")
          .then((response) => {
            if (response.status == 200 && response.data.user) {
              setUser(response.data.user);
            } else {
              router.push("/login");
            }
          })
          .catch((e) => {
            console.log(e);
            router.push("/login");
          });
      } else {
        router.push("/login");
      }
      setLoading(false);
    }
    loadUserFromCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        setUser(response.data.user);
        Cookies.set("token", response.data.access_token, {
          expires: 24,
        });
        axiosConfig.defaults.headers.Authorization = `Bearer ${Cookies.get(
          "token"
        )}`;

        if (response.data.user.role == "Manager") {
          router.push("/");
        } else {
          router.push("/employees/" + response.data.user.id);
        }
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.error);
      });
  };

  const logout = async () => {
    const token = Cookies.get("token");
    Cookies.remove("token");
    setUser(null);
    delete axiosConfig.defaults.headers.Authorization;

    await axiosConfig
      .post(
        "auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        router.push("/login");
      })
      .catch((e) => {
        router.push("/login");
      });
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
  if (loading || (!isAuthenticated && router.pathname !== "/login")) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader
          type="Puff"
          color="#355ea0"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }

  return children;
};
