import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Theme from "./ui/theme"
import JwtRoute from "./jwt-route"

import Homepage from "./features/homepage"
import Login from "./features/login"
import Profile from "./features/profile"
import IssueContract from "./features/contracts/new"

export default function App() {
  return (
    <Theme>
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

          <JwtRoute exact path="/contracts/new/:id">
            <IssueContract />
          </JwtRoute>

        </Switch>
      </BrowserRouter>
    </Theme>
  )
}
