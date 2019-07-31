import React, { Component } from 'react';
import appStyle from './App.module.css'
import ResultModal from './components/modal';


class App extends Component{

  state = {
    value: '',
    openModal: false,
    tinyURL: null
  }

  valueHandler = e =>{
    this.setState({
      value: e.target.value
    })
  }

  submitHandler = e =>{
    e.preventDefault();
    this.setState({
      tinyURL: this.state.value,
      openModal: true
    })
    
  }

  closeModal = () =>{
    this.setState({
        openModal: false
    })
}

  render(){
    // console.log(this.state)
    return(
      <div className={appStyle.App}>
        <ResultModal
          show={this.state.openModal}
          closed={this.closeModal}
          newURL={this.state.tinyURL}
        />
        <h1>Greg's URL Shortener</h1>
        <div className={appStyle.positioning}>
          <form className={appStyle.box} onSubmit={e=>this.submitHandler(e)}>
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
