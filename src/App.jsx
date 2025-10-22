import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Favoritos from "./components/Favoritos";

function App() {

  return (
    <>
      <div>
        <h1>Cat Gallery</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </div>
    </>
  )
}

export default App
