import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import List from '../features/list/List'
import Details from '../features/details/Details'
import ScrollTop from '../components/scrollTop/ScrollTop'
import styles from './App.module.css'

function App() {
  return (
    <Router>
      <ScrollTop />
      <div className={styles.app}>
        <Switch>
          <Route exact path={['/', '/search']}>
            <section>
              <List numCols={4} gutter={16} width={1040} pageSize={35} />
            </section>
          </Route>
          <Route path="/:id" render={({ match }) => {
            return (
              <section>
                <Details id={match.params.id}/>
              </section>
            )
          }} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
