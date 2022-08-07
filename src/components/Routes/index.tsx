import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const user = localStorage.getItem('user');

  if (user) {
    console.log('Yes, user exist');
  } else {
    console.log('No user');
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AnonymousRoute = ({ children }: PropsWithChildren) => {
  const user = localStorage.getItem('user');

  if (user) {
    console.log('Yes, user exist');
  } else {
    console.log('No user');
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
