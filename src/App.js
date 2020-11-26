import React, { useLayoutEffect, useState } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Firebase from './services/FirebaseConnect'
import RecadosRegistro from './pages/RecadosRegistro'

export default function App() {

  const [user, setUser] = useState(null)

  useLayoutEffect(() => {
    Firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user !== null) {
          setUser(user.uid)
        } else {
          setUser(null)
        }
      })
    }, [])

    const PrivateRoute = ({ component: Component }) => {
    return <Route
      render={(props => {

        if (user) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: "/" }} />
        }
      })}
      /> 
    }
  
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/RecadosRegistro" component={RecadosRegistro} />
        <PrivateRoute path="/menu" component={Menu} />

      </Switch>

    </HashRouter>
  )
}
