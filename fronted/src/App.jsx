import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/login";
import AuthSignup from "./pages/auth/signup";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="signup" element={<AuthSignup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
