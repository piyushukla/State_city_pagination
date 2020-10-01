import React, { useEffect, useState } from "react";
import Cities from "./Component/All_cities";
import Short from "./Component/ShortList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Cities}>
          <Cities />
        </Route>
        <Route path="/short" component={Short}>
          {" "}
          <Short />{" "}
        </Route>
      </Router>
    </div>
  );
}

export default App;
