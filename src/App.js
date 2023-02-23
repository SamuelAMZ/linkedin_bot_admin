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

            {/* main */}
            <div className="main">
              <Routes>
                {/* auth pages */}
                <Route path="/" exact element={<Home />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
}

export default App;
