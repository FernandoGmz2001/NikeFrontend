import Navbar from "../../components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import JustDoIt from "./components/NewArrivals/components/JustDoIt";
import NewArrivals from "./components/NewArrivals/NewArrivals";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="wrapper header">
        <Navbar bagColor={"white"} userColor={"white"} />
        <Hero />
      </header>
      <JustDoIt/>
      <div className="wrapper">
        <NewArrivals />
      </div>
    </div>
  );
}

export default Home;
