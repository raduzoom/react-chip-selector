import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { dzsChipSelectorWebComponent_init } from 'chip-selector/dist/dzsChipSelectorWebComponents';

dzsChipSelectorWebComponent_init();
export default function App() {
  let chipSelectorOptions = JSON.parse(
    '[{"htmlContent":"Apple ","value":"apple","currentStatus":"unchecked"},{"htmlContent":"Orange ","value":"orange","currentStatus":"checked"},{"htmlContent":"<span>Apricot</span> ","value":"apricot","currentStatus":"unchecked"}]'
  );

  const [currentOptions, setCurrentOptions] = useState(chipSelectorOptions);
  const elementRef = useRef();

  const onUpdate = async (allOptions) => {
    const selectedOptions = allOptions.filter(
      (el) => el.currentStatus === 'checked'
    );
    console.log({ selectedOptions });
    setCurrentOptions(selectedOptions);
  };

  const addStyle = (url, $myRef) => {
    const style = document.createElement('link');
    style.href = url;
    style.rel = 'stylesheet';
    style.async = true;

    // document.head.appendChild(style);
    $myRef.wrapper.appendChild(style);
  };

  useEffect(() => {

    /** @type {DzsChipSelector} */
    const dzsChipSelector = elementRef.current;
    if (dzsChipSelector) {
      dzsChipSelector.onUpdate = onUpdate;
      addStyle(
        'https://unpkg.com/chip-selector/dist/style/skins/skin-default.css',
        dzsChipSelector
      );
    }
  }, []);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <h6>options rendered from React: </h6>
      <em>
        {currentOptions.map((option) => {
          if (option.currentStatus === 'checked') {
            return `${option.value} `;
          }
          return null;
        })}
      </em>
      <dzs-chip-selector
        ref={elementRef}
        data-persistentOptions={JSON.stringify(chipSelectorOptions)}
      ></dzs-chip-selector>
    </div>
  );
}
