import About from "../Components/About";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HomeNavbar from "../Components/HomeNavbar";
import Products from "../Components/Products";

function Home() {
  return (
    <>
      <HomeNavbar />
      <Header />
      <section id="collection" class="py-5">
        <div class="container">
          <div class="title text-center">
            <h2 class="position-relative d-inline-block">New Collection</h2>
          </div>
          <div class="row g-0">
            <Products />
          </div>
        </div>
      </section>
      <About />
      <Footer />
    </>
  );
}

export default Home;
