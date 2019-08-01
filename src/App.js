import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom"

import Home from './Home'

class App extends Component{

    NoPage = () =>{
        return(
          <div>
              <Redirect push to={Home}/>
          </div>
        )
      }

    findParam = () =>{
        const param = window.location.pathname
    }

    render(){
        return(
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route exact path="/:param" component={this.findParam}/> 
                <Route component ={this.NoPage}/> 
            </Switch>
        );
    };
};

export default App;