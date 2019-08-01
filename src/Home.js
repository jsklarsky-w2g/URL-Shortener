import React, { Component } from 'react';
import appStyle from './Home.module.css'
import ResultModal from './components/modal';


class Home extends Component{

  state = {
    value: '',
    openModal: false,
    tinyURL: null,
    title: 'Trim URL Below!'
  }

  valueHandler = e =>{
    this.setState({
      value: e.target.value
    })
  }

  submitHandler = e =>{
    e.preventDefault();
    if(this.state.value === ''){
      this.setState({
        title: 'Oops...you forgot to enter a URL'
      })
    }else{
      this.setState({
        tinyURL: `https://gtrim.com/123`,
        openModal: true
      })
    }
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
          yourHref={this.state.value}
        />
        <h1>Greg's URL Shortener</h1>
        <div className={appStyle.positioning}>
          <form className={appStyle.box} onSubmit={e=>this.submitHandler(e)}>
            <p>{this.state.title}</p>
            <div>
              <input
                className={appStyle.inputText}
                type="url"
                placeholder='Paste URL Here'
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

export default Home;
