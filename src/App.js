import React, { Component } from 'react';
import appStyle from './App.module.css'


class App extends Component{

  state = {
    value: ''
  }

  valueHandler = e =>{
    this.setState({
      value: e.target.value
    })
  }

  submitHandler = e =>{
    e.preventDefault();

  }

  render(){
    return(
      <div className={appStyle.App}>
        <h1>Greg's URL Shortener</h1>
        <div className={appStyle.positioning}>
          <form className={appStyle.box} onSubmit={this.submitHandler}>
            <p>Trim URL Below! </p>
            <div>
              <input
                className={appStyle.inputText}
                type="url"
                placeholder="Paste URL Here"
                value={this.state.value}
                onChange={this.valueHandler}
              />
            </div>
            <div>
              <button type="submit" className={appStyle.inputSubmit}>Submit</button>
            </div>
            
          </form>
        </div>
      </div>
    );
  }
}

export default App;
