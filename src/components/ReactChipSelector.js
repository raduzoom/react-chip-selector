import React, {useEffect, useRef, useState} from 'react';

/**
 * @typedef {Object} ChipSelectorItem
 * @property {string} htmlContent - html content
 * @property {string} value - value
 * @property {string} currentStatus - current status
 */
/**
 *
 * @param {Object} props
 * @property {ChipSelectorItem[]} suggestedOptions - html content
 * @property {Function} onSelectedOptionsChange - callback function to update selected options in parent component
 * @returns {JSX.Element}
 * @constructor
 */
import {dzsChipSelectorWebComponent_init} from "chip-selector/dist/dzsChipSelectorWebComponents";

dzsChipSelectorWebComponent_init();

export function ReactChipSelector(props) {

  const self = this;
  const [selectedOptions, setSelectedOptions] = useState([]);


  /** @var {ChipSelectorItem[]} */
  let suggestedOptions = []
  let chipSelectorOptions = {

    viewSkin: 'default'
  }

  if (props.chipSelectorOptions) {
    chipSelectorOptions = Object.assign(chipSelectorOptions, props.chipSelectorOptions);
  }


  if (props.suggestedOptions) {
    suggestedOptions = props.suggestedOptions;
  }
  const myRef = useRef(null);


  /** @type {DzsChipSelector} */
  let $myRef = null;
  const options = [];
  const addStyle = url => {
    const style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    style.async = true;

    $myRef.wrapper.appendChild(style);
  };


  const onUpdate = async (allOptions) => {
    const selectedOptions = allOptions.filter((el) => el.currentStatus === 'checked');
    setSelectedOptions(
      selectedOptions
    );

    if (props.onSelectedOptionsChange) {
      props.onSelectedOptionsChange(selectedOptions); // calling the callback function to update selected options in parent component
    }
  }


  useEffect(() => {
    $myRef = myRef.current;
    addStyle(`https://unpkg.com/chip-selector/dist/style/skins/skin-${chipSelectorOptions.viewSkin}.css`);
    $myRef.assignOnUpdateFunction = onUpdate;


    return function cleanup() {
      console.log('clean up ONCE');
    };


  }, []);
  const wrapperStyle = {
    width: '100%',
  }

  return (
    <div style={wrapperStyle}>
      <dzs-chip-selector ref={myRef} data-persistentOptions={JSON.stringify(suggestedOptions)}
                         data-chip-selector-options={JSON.stringify(chipSelectorOptions)}>
        <link rel="stylesheet" data-lazy-href="dzs-chip-selector/style/skins/skin-default.css"/>
      </dzs-chip-selector>
    </div>
  );
}
