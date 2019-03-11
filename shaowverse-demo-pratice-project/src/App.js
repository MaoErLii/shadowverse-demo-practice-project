import React, { Component } from 'react';
// import logo from './logo.svg';
import test from './assets/svg/test.svg'
import './App.css';

class App extends Component {
  componentDidMount () {
      console.log('生命周期componentDidMount')
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<p>*/}
            {/*Edit <code>src/App.js</code> and save to reload.*/}
          {/*</p>*/}
          {/*<a*/}
            {/*className="App-link"*/}
            {/*href="https://reactjs.org"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
          {/*>*/}
            {/*Learn React*/}
          {/*</a>*/}
            <div>
                <img src={test} type="image/svg + xml" alt="" />
            </div>
        </header>
          <div className="App-content">
            <article className="wrap">
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
                <p>练习毛玻璃效果</p>
            </article>
            <div className="">

            </div>
          </div>
        <footer className="App-footer">
          <div>personal project</div>
        </footer>
      </div>
    );
  }
}

export default App;
