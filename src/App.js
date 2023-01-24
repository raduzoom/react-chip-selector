import logo from './logo.svg';
import './App.css';
import React from "react";

import {init_chipSelector} from "chip-selector/dist";
import * as DzsChipSelectorWeb from "chip-selector/dist/dzsChipSelectorWebComponents-dev";
import {Header} from "./components/Header";
import {themes, ThemeContext} from "./contexts/theme";

class App extends React.Component {

  chipSelectorOptions = JSON.parse('[{"htmlContent":"Apple ","value":"apple","currentStatus":"unchecked"},{"htmlContent":"Orange ","value":"orange","currentStatus":"checked"},{"htmlContent":"<span>Apricot</span> ","value":"apricot","currentStatus":"unchecked"}]');

  constructor(props) {
    super(props);
    this.state = {selectedOptions:this.chipSelectorOptions, showHeader: true};
    this.myRef = React.createRef();
  }

  testType(arg){

  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        showHeader: false
      });
    }, 5000)
    const onUpdate  = async (allOptions) => {
      const selectedOptions = allOptions.filter((el)=>el.currentStatus==='checked');
      console.log({selectedOptions});
      this.setState({
        selectedOptions: selectedOptions
      })
    }

    const self = this;

    /** @type {DzsChipSelector} */
    const $myRef = self.myRef.current;
    async function loadCss(){

      // const path = 'chip-selector/dist/style/skins/skin-default.css';
      /**
       *
       * @type {Module}
       */

      /** @type {HTMLElement} */

      import('chip-selector/dist/style/skins/skin-default.css').then((...args) => {
        const cssStyle = args[0].default[0][1];
        $myRef.wrapper.insertAdjacentHTML('beforeBegin', `<style>${cssStyle}</style>`)
      })

    }
    $myRef.onUpdate = onUpdate;


    loadCss().then();


  }
  handleSubmitClick () {
    const name = this._name.value;
    // do something with `name`
    console.log(name);
  };


  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {

//     const FancyButton = React.forwardRef((props, ref) => (
//
//     ));
// // You can now get a ref directly to the DOM button:
//     const ref = React.createRef();


    const HeaderComponent = (<Header></Header>);
    return (
      <div className="App">
        <ThemeContext.Provider value={themes.dark}>
        {!!this.state.showHeader && HeaderComponent}
        </ThemeContext.Provider>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <input type="text" ref={(input) => (this._name = input)} />
            <button onClick={this.handleSubmitClick.bind(this)}>Sign up</button>
          </div>

          <p>
            234Edit <code>src/App.js</code> and save to reload 2 3 4 5.
          </p>
          {
            this.state.selectedOptions.map((option)=>{
              if(option.currentStatus==='checked'){

                return `${option.value} `;
              }
              return null;
            })
          }
          <dzs-chip-selector ref={this.myRef} data-persistentOptions={JSON.stringify(this.chipSelectorOptions)}>
            <link rel="stylesheet" data-lazy-href="dzs-chip-selector/style/skins/skin-default.css"/>
          </dzs-chip-selector>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

// function App() {
//   // console.log(DzsChipSelector2.constructor);
//
//   return (
//
//   );
// }

export default App;
