import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignOut,
} from "@react-query-firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@lib/firebase";
import { UserInfo } from "@firebase/auth";

export const useAuth = () => {
  const toast = useToast();
  const navigateTo = useNavigate();
  const [user, setUser] = useState<{} | null | UserInfo>(null);
  const [userId, setUserId] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const signOutMutation = useAuthSignOut(firebaseAuth);
  const { mutate, isLoading } = useAuthSignInWithEmailAndPassword(
    firebaseAuth,
    {
      onError(error) {
        console.log(error);
        toast({
          status: "error",
          title: `${error.message}`,
          isClosable: true,
          variant: "subtle",
          duration: 5000,
        });
        setIsLoggedIn(false);
      },
      onSuccess(data) {
        const currentUser = data;
        setUser(currentUser);
        setIsLoggedIn(true);
        setUserId(currentUser.user.uid);
        console.log(currentUser);
        localStorage.setItem("user", JSON.stringify(data?.user));
        navigateTo("/dashboard");
      },
    }
  );

  const signInAdmin = (email: string, password: string) => {
    if (email && password) {
      mutate({ email, password });
      setIsLoggedIn(true);
    }
  };

  const signOutAdmin = () => {
    signOutMutation.mutate();
    setUser(null);
    setUserId("");
    setIsLoggedIn(false);
    localStorage.clear();
    navigateTo("/");
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        setUserId("");
        setIsLoggedIn(false);
        localStorage.clear();
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    userId,
    signInAdmin,
    isLoggedIn,
    isLoading,
    signOutAdmin,
  };
};
