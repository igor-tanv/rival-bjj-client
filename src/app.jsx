import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Theme from "./ui/theme"
import JwtRoute from "./jwt-route"

import Homepage from "./features/homepage"
import Login from "./features/login"
import Profile from "./features/profile"
import Contracts from "./features/contracts"
import IssueContract from "./features/contracts/new"
import Register from "./features/register"
import Chat from "./features/chat"
import ConfirmEmail from "./features/confirm-email"

import EditProfile from "./features/profile/edit"

export default function App() {
  return (
    <BrowserRouter>
      <Theme>
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/confirm">
            <ConfirmEmail />
          </Route>


          <JwtRoute path='/chat/:recipient'>
            <Chat />
          </JwtRoute>

          <JwtRoute exact path="/profile">
            <Profile />
          </JwtRoute>

          <JwtRoute exact path="/contracts">
            <Contracts />
          </JwtRoute>

          <JwtRoute exact path="/profiles/edit">
            <EditProfile />
          </JwtRoute>

          <Route exact path="/profiles/:id">
            <Profile />
          </Route>

          <JwtRoute exact path="/contracts/new/:id">
            <IssueContract />
          </JwtRoute>



        </Switch>
      </Theme>
    </BrowserRouter>

  )
}
