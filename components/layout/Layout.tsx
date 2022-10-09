import ReactProps from "../../interfaces/ReactProps";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout: React.FC<ReactProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
