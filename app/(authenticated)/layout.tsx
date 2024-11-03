import { SideBarNav } from "@/components/authenticated/SideBar";

import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: Prop) => {
  return <SideBarNav children={children} />;
};

export default AuthenticatedLayout;
