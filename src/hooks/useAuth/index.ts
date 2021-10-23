import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router-dom";
import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignOut,
} from "@react-query-firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../lib/firebase";

export const useAuth = () => {
  const toast = useToast();
  const history = useHistory();
  const storage = localStorage;
  const [user, setUser] = useState<{} | null>(null);
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
          duration: 5000,
        });
        setIsLoggedIn(false);
      },
      onSuccess(data) {
        const currentUser = data;
        setUser(currentUser);
        setIsLoggedIn(true);
        console.log(currentUser);
        storage.setItem("user", JSON.stringify(data));
        history.push("/dashboard");
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
    setIsLoggedIn(false);
    history.push("/");
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    signInAdmin,
    isLoggedIn,
    isLoading,
    signOutAdmin,
  };
};
