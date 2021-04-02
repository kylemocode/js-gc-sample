import { useCallback, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

const COUNT = 10000000;
const TIME = 0;
const items = new Array(COUNT).fill({ counter: 0 });

function App() {
  const iconRef = useRef(null);

  useEffect(() => {
    if (!iconRef.current) return;
    
    rotate(iconRef.current);
  }, []);

  const cheapLoop = useCallback(() => {
    console.log('cheap loop');
    for (let i = 0; i < items.length; i++) {
      items[i].counter = items[i].counter + 1;
    }
  }, []);

  const expensiveLoop = useCallback(() => {
    console.log('expensive loop');
    for (let i = 0; i < items.length; i++) {
      items[i] = {
        counter: items[i].counter + 1,
    };
  }
  }, []);

  const rotate = useCallback((element) => {
    function update(time) {
      element.style.transform = `rotateZ(${time / 10}deg)`;
      requestAnimationFrame(update);
    }

    update(TIME);
  }, [])

  console.log(items);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" ref={iconRef}/>
        <p>
          GC Demo
        </p>
        <button className='App-btn' onClick={cheapLoop}>Cheap Loop</button>
        <button className='App-btn' onClick={expensiveLoop}>Expensive Loop</button>
      </header>
    </div>
  );
}

export default App;
