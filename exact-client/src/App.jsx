import { Helmet } from "react-helmet";
import Header from "./layout/Header";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Tire Store - Best Prices for Tires</title>
        <meta name="description" content="Find a wide selection of tires at affordable prices." />
        <meta name="keywords" content="tire store, tires, best prices, car tires, truck tires" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://example.com/tire-store" />
        {/* Add any other relevant meta tags */}
      </Helmet>
      <Header />
      <MainPage />
    </div>
  );
};

export default App;
