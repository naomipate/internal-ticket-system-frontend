import React from "react";
import Spinner from "./components/common/Spinner/Spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home/Home"));
const Nav = React.lazy(() => import("./components/Nav/Nav"));
const EditTicket = React.lazy(() =>
  import("./components/EditTicket/EditTicket")
);
const CreateTicket = React.lazy(() =>
  import("./components/CreateTicket/CreateTicket")
);
const Error = React.lazy(() => import("./components/Error/Error"));
const ShowPage = React.lazy(() =>
  import("./components/ShowTableUnit/ShowPage")
);

// CSS Color Scheme Hex Code (RGB) (13,197,193)

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<Spinner />}>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/?" element={<Home />} />
            <Route path="/:id" element={<ShowPage />} />
            <Route path="/edit-ticket/:id" element={<EditTicket />} />
            <Route path="/new-ticket" element={<CreateTicket />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
