import logo from './logo.svg';
import './App.css';
import React from "react";
import {Header} from "./components/Header";
import {ThemeContext, themes} from "./contexts/theme";
// import styled, { createGlobalStyle } from 'styled-components';
// import 'chip-selector/dist/style/skins/skin-default.css';
// import quillCss from 'chip-selector/dist/style/skins/skin-default.css';
import {ReactChipSelector} from "./components";
import {chipSelectorOptions} from "./App.config";


class App extends React.Component {

  /** @var {ChipSelectorItem[]} */
  chipSelectorOptions = chipSelectorOptions
  ;

  constructor(props) {
    super(props);
    this.state = {selectedOptions: this.chipSelectorOptions, showHeader: true};
    this.myRef = React.createRef();
    this.cssRef = React.createRef();
  }

  testType(arg) {

  }

  componentDidMount() {


    setTimeout(() => {
      this.setState({
        showHeader: false
      });
    }, 5000)


  }

  handleSubmitClick() {
    const name = this._name.value;
    // do something with `name`
    console.log(name);
  };


  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  loadedSkin() {
    console.log('loadedSkin - ', this);
  }

  render() {
    console.log('render');


    const HeaderComponent = (<Header></Header>);

    const chipSelectorOptions = {"inputPlaceholderText": "ceva1"};
    const chipSelectorOptions2 = {"inputPlaceholderText": "ceva2", viewSkin: 'default--theme-dark'};

    const handleSelectedOptionsChange = (options) => {
      console.log('options change - ', options);
      this.setState({
        selectedOptions: options
      });
    };

    const wrapperStyle = {
      width: '100%',
      maxWidth: '900px',
      padding: '15px',
      margin: '10px auto'
    }

    return (
      <div className="App">
        <React.StrictMode>
          <ThemeContext.Provider value={themes.dark}>
            {!!this.state.showHeader && HeaderComponent}
          </ThemeContext.Provider>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <div>
              <input type="text" ref={(input) => (this._name = input)}/>
              <button onClick={this.handleSubmitClick.bind(this)}>Sign up</button>
            </div>

            <p>
              234Edit <code>src/App.js</code> and save to reload 2 3 4 5.
            </p>
            {
              this.state.selectedOptions.map((option) => {
                if (option.currentStatus === 'checked') {

                  return `${option.value} `;
                }
                return null;
              })
            }
            {/*<>*/}
            {/*  <ChipSelector ref={this.myRef} data-persistentOptions={JSON.stringify(this.chipSelectorOptions)}>*/}
            {/*  </ChipSelector>*/}
            {/*</>*/}

            <div style={wrapperStyle}>

              <ReactChipSelector suggestedOptions={this.chipSelectorOptions} chipSelectorOptions={(chipSelectorOptions)}
                                 onSelectedOptionsChange={handleSelectedOptionsChange}></ReactChipSelector>
              {/*<ReactChipSelector suggestedOptions={this.chipSelectorOptions} chipSelectorOptions={(chipSelectorOptions2)}*/}
              {/*                   onSelectedOptionsChange={handleSelectedOptionsChange}></ReactChipSelector>*/}
            </div>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {/*<link rel="stylesheet" ref={this.cssRef} href="https://unpkg.com/chip-selector@1.0.34/dist/style/skins/skin-default.css" onLoad={this.loadedSkin.bind(this)}/>*/}
          </header>
        </React.StrictMode>
      </div>
    );
  }
}


export default App;
