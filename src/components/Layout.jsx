import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout =({ children })=> {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
export default Layout;