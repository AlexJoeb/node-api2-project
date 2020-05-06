import React, { useState, useEffect } from 'react'
import Posts from './Components/Posts';
import Post from './Components/Post';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {

  return (
    <div className='app'>
      <Router>
        <div className="title">
          <h1>Lord of the Rings Blog</h1>
          <hr />
        </div>
        <Switch>
          <Route exact path='/' render={props => <Posts />} />
          <Route path='/:id' render={props => <Post />} />
          <Route render={() => <p>Nothing was found here.</p>} />
        </Switch>
      </Router>
    </div>
  )
}
