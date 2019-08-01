import React, { Component } from 'react';
import appStyle from './Home.module.css'
import ResultModal from './components/modal';
import { read, write } from './AxiosOrders'

var randomstring = require("randomstring");

class Home extends Component{

  componentDidMount(){
    this.getURLs();
  }

  getURLs = async () =>{
    let res = await read.get();
    let { data } = res;
    this.setState({ currentUrls: data })
  }

  addToDatabase = (trim, full) =>{
   
    console.log(trim, full)
    write.put(`${trim}/${full}.json`) //shit goes haywire here!!!
      .then(res=>{
        console.log(res)
        this.setState({
          openModal:true,
          tinyURL: `localhost:3000/${trim}`
        })
      })
      .catch(err=>{
        console.log(err)
        this.setState({
          title: 'Whoops...something went wrong'
        })
      })
      this.getURLs()
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

  createHash = () =>{
    let newHash = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
    if(Object.keys(this.state.currentUrls).includes(newHash)){
      this.createHash()
    } else{
      return newHash
    }
  }

  submitHandler = e =>{
    e.preventDefault();
    const currentUrls = this.state.currentUrls
    const newUrl = this.state.value
    if(newUrl === ''){
      this.setState({
        title: 'Oops...you forgot to enter a URL'
      })
    }else{
     if(Object.values(currentUrls).includes(newUrl)){
        const link = Object.keys(currentUrls).find(url=>currentUrls[url] === newUrl)
        this.setState({
          openModal: true,
          tinyURL: `localhost:3000/${link}`
        })
      } else {
        const hash = this.createHash();
        this.addToDatabase(hash, newUrl)
      }
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
      window.location.assign(this.state.currentUrls[param]) :
      console.log('not a valid parameter')
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
