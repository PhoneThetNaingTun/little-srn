import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const AuthLayout = ({ children }: Prop) => {
  return <div className="my-20">{children}</div>;
};

export default AuthLayout;
