import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import ReportLostItem from "./Components/Report/ReportLostItem";
import { AppProvider } from "./Components/Context/Context"; // Importing Context Provider
import ReportFoundItem from "./Components/Report/ReportFoundItem";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import Browse from "./Components/Browse/Browse";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/" />;
};
function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <AppProvider>
      <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/report-lost-item" element={<ProtectedRoute element={<ReportLostItem />} />} />
          <Route path="report-found-item" element={<ProtectedRoute element={<ReportFoundItem />} />} />
          <Route path="/browse-lost-items" element={<Browse />} />
          <Route path="/browse-found-items" element={<Browse />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      </Provider>
    </AppProvider>
  );
}

export default App;
