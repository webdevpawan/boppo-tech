import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Register from "./components/Register";
import Header from "./components/Header";
import Task from "./components/Task";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
