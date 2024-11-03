import Footer from "@/components/landingSide/footer";
import Nav from "@/components/landingSide/nav";

interface Prop {
  children: React.ReactNode;
}

const Layout = ({ children }: Prop) => {
  return (
    <div>
      <div className="lg:px-20 px-2">
        <Nav />
      </div>

      <div className="lg:px-20 px-2">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
