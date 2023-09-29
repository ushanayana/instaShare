import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Home from './components/Home'
import MyProfile from './components/MyProfile'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/header" component={Header} />
      <Route exact path="/" component={Home} />
      <Route exact path="/my-profile" component={MyProfile} />
    </Switch>
  </BrowserRouter>
)

export default App
