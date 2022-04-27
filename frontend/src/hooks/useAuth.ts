import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { setAuthToken } from "../helpers";
import { GlobalContext } from "../context";
import { config } from "../config";

export const useAuth = () => {
  localStorage.getItem("token") && setAuthToken(localStorage.getItem("token")!);

  const { setId, setIsLoading, setUserName, setAddress } =
    useContext(GlobalContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    token && loadUser(token);

    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const register = async (nickname: string, address: string) => {
    setIsLoading(true);

    try {
      let { data } = await config.axios.post(
        `/api/users/register`,
        JSON.stringify({
          nickname,
          address,
        })
      );
      let { token, success, msg } = JSON.parse(data);
      if (success && token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
        await loadUser(token);
      } else {
        toast.error(msg);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const login = async (address: string) => {
    setIsLoading(true);

    try {
      const { data } = await config.axios.post(
        `/api/auth/login`,
        JSON.stringify({ address })
      );

      const { token, success, msg } = JSON.parse(data);
      if (success && token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
        await loadUser(token);
      } else {
        toast.error(msg);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const loadUser = async (token: string) => {
    try {
      const { data } = await config.axios.get(`/api/auth`, {
        headers: {
          Authorization: `x-auth-token ${token}`,
        },
      });

      const { success, msg, user } = JSON.parse(data);
      if (success && user) {
        console.log({
          success,
          user,
        });
        setIsLoggedIn(true);
        setId(user._id);
        setUserName(user.nickname);
        setAddress(user.address);
        setIsLoading(false);
      } else {
        toast.error(msg);
      }
    } catch (error: any) {
      localStorage.removeItem("token");
      toast.error(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setId(null);
    setUserName(null);
    setAddress(null);
  };

  return {
    isLoggedIn,
    register,
    login,
    logout,
    loadUser,
  };
};
