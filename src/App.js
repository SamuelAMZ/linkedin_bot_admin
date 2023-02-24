import React from "react";
import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";

// pages
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Linkedin from "./pages/Linkedin/Linkedin";

// components
import Sidebar from "./components/Sidebar/Sidebar";

// contexts
import { MenuOpenProvider } from "./contexts/MenuOpen";

function App() {
  // react query
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <>
          {/* component code */}
          <div className="site-container">
            <div className="notif"></div>

            <MenuOpenProvider>
              {/* sidebar */}
              <Sidebar />

              {/* main */}
              <div className="main">
                <Routes>
                  {/* auth pages */}
                  <Route path="/" exact element={<Login />} />
                  <Route path="/register" exact element={<Register />} />
                  <Route path="/linkedin" exact element={<Linkedin />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </MenuOpenProvider>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
}

export default App;
