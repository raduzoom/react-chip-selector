import React, {useState, useEffect, useContext} from 'react';
import {ThemeContext} from "../contexts/theme";

export function Header() {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return function cleanup() {
      console.log('cleaned up');
    };
  }, [count]);

  useEffect(() => {
    console.log('call once');
    return function cleanup() {
      console.log('clean up ONCE');
    };
  }, []);

  return (
    <div>
      <span>{theme.foreground}</span>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}