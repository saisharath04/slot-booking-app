import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import { Provider } from "react-redux";
import BookingHistory from "./components/BookingHistory";
import SlotBooking from "./components/SlotBooking";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<SlotBooking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking_history" element={<BookingHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
