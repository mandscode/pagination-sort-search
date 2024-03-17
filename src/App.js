import DemoNavbar from "./components/Navbars/DemoNavbar";
import Footer from "./components/Footers/Footer";
import Index from "./Pages/Index";
import { AppContext, AppProvider } from "./components/Context/AppContext";
import { useContext, useEffect, useState } from "react";

function App() {
  const [a,b] = useState()
  const {apiData, setApiData } = useContext(AppContext);

  useEffect(() => {
    b(apiData)
  },[apiData])
  
  return (
    <>
      <DemoNavbar/>
      <Index filteredData={a}/>
      <Footer/>
    </>
  );
}

export default App;