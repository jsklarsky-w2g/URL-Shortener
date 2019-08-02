import React, { Component } from 'react';
import appStyle from './Home.module.css'
import ResultModal from './components/modal';
import axios from 'axios';
import baseUrl from './AxiosOrders';

var randomstring = require("randomstring");

class Home extends Component{

  state = {
    currentUrls:{},
    value: '',
    openModal: false,
    tinyURL: null,
    title: 'Trim URL Below!'
  }

  componentDidMount(){
    this.getURLs();
  }

  getURLs = async () =>{
    const res = await axios.get(`${baseUrl}.json`);
    const { data } = res;
    await Object.keys(data).map(each=>{
      this.setState(prevState=>({
        currentURL: prevState.currentUrls[data[each].hash] = data[each].originalUrl
      }))
    })
  }

  addToDatabase = (trim, full) =>{
    console.log(trim, full)
    const myPost = {
      hash: trim,
      originalUrl: full
    }
    axios.post(`${baseUrl}.json`, myPost ) 
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
    let myUrl = ''
    if(window.location.pathname.length >1){
      const param = window.location.pathname.replace(/[/]/,"")
      Object.keys(this.state.currentUrls).find(currentURL=>{
        if (currentURL === param){
          myUrl = this.state.currentUrls[param]
        }
      })
      console.log(myUrl)
      if(myUrl.length){
        window.location.assign(myUrl)
      } else {
        console.log('failed to load')
      }
      
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
