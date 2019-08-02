# Tiny URL Creator

## Contents
    * Description
    * Features
    * Technologies
    * Packages
    * Functionality
    * Testing

## Description
A custom a URL shortener web application in the same vein as bitly, TinyURL, etc.

## Features
* When navigating to the root path of the app in a browser, a user should be presented with a form that allows them to paste in a (presumably long) URL.
* When a user submits the form they should be presented with a simplified URL of the form http://localhost:3000/{12 character hash param}.
* When a user navigates to a shortened URL that they have been provided by the app they should be redirected to the original URL that yielded that short URL.

## Technologies
* HTML/CSS/JavaScript
* React
* Google Firebase
* Cypress.js

## Packages
* npx i create-react-app
* npm i randomstring
* npm i axios
* npm i cypress --save-dev

## Functionality

### On Mount
* When the page loads, the page begins by asynchronously retrieving the previously stored custom pathnames and their corresponding Urls from the database. 
* Next, the page checks the current url for a pathname. If one is present, it checks to see if it is in the database, and forwards it to its respective forwarding address if so; otherwise, it keeps the user on the current page.

    ```
    componentDidMount = async ()=> {
    await this.getURLs();
    this.redirect()
    }
    ```
### Submit Handler
* The submitHandler ensures the submitted content is: 
    a) valid; 
    b) if a trimmed url already exists for this url;
    c) if not, then a hash is generated, and this and the corresponding URL are pushed to the database. 
* The hash is generated from the randomstring package (npm i randomstring)
* Submit handler is called in the form upon submittal via:
    ```
    <form className={appStyle.box} onSubmit={e=>this.submitHandler(e)}>
    ```
* an e.preventDefault() is invoked in the function to prevent the page from reloading on submit.

### Result Modal
* Trimmed Urls are delivered via a modal that appears when the submitHandler() sets this.state.openModal to true upon retrieving the new url. This state is passed to the modal component and activated as follows:

* Home.js
    ```
    <ResultModal
          show={this.state.openModal}
          closed={this.closeModal}
          newURL={this.state.tinyURL}
          yourHref={this.state.value}
        />
    ```
* components/update.module.css
    ```
    .ModalOpen {
    display:block;
    animation: openModal 0.4s ease-out forwards;
    }

    @keyframes openModal{
        0%{
            opacity: 0;
            transform: translateY(-100%)
            
        }
        50%{
            opacity: 1;
            transform: translateY(90%)
        }
        100%{
            opacity: 1;
            transform: translateY(0)
        }
    }
    .ModalClosed {
        display:none;
    }
    ```
* components/modal.js
    ```
    onst ResultModal = props => {
    const cssModal = [
        update.Modal,
        props.show ? update.ModalOpen : update.ModalClosed
    ];
  return (
    <div className={cssModal.join(' ')}>
    ```

## Testing
### Cypress.JS 
* Front-End testing confirms the Features listed above were satisfied. Test criteria includes:
    1) Upon page load, the initial input header "Trim URL Below" is present.
    2) If a user clicks submit without entering data, the input header returns an error statement instructing the user to input a valid URL.
    3) If a user inputs https://www.cnn.com and clicks submit:
        a) the response modal will become visible; 
        b) a trimmed URL pathname is appended to the local host; 
        C) the trimmed URL's href matches that of the submitted URL (in this case, https://www.cnn.com).
