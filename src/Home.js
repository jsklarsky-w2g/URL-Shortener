import React, { Component } from 'react';
import appStyle from './Home.module.css'
import ResultModal from './components/modal';
import { read } from './AxiosOrders'


class Home extends Component{

  componentDidMount(){
    this.getURLs();
  }

  getURLs = async () =>{
    let res = await read.get();
    let { data } = res;
    this.setState({ currentUrls: data })
  }

  state = {
    currentUrls:{},
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
      this.setState(prevState=>({
        // currentUrls: prevState.concat(),
        tinyURL: `https://gtrim.com/123`,
        openModal: true
      }))
    }
  }

  closeModal = () =>{
    this.setState({
        openModal: false
    })
}

  render(){
    console.log(this.state.currentUrls)

    if(window.location.pathname.length >1){
      const param = window.location.pathname.replace(/[/]/,"")
      console.log(param)
      Object.keys(this.state.currentUrls).includes(param) ? 
      window.location.assign(this.state.currentUrls[param]['url']) :
      console.log('not a valid link')
    }
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
