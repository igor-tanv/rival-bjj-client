import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Homepage from "./features/homepage"
import Login from "./features/login"
import Profile from "./features/profile"

export default function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/profiles/:id">
          <Profile />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}
