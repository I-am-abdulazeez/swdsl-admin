import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@store/useAuthStore';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    console.log('Yes, user exist');
  } else {
    console.log('No user');
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AnonymousRoute = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    console.log('Yes, user exist');
  } else {
    console.log('No user');
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
