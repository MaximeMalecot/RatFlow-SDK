import '@/App.css';
import useScrollTracker from './hooks/use-scroll';

function App() {
  const { ref } = useScrollTracker({ tag: "div"});

  return (
    <div ref={ref} className="App">
      {/* <Button/>
      <Button/>
      <Form/> */}
      <div style={{height: "100vh", border: "1px solid red"}}></div>
    </div>
  )
}

export default App
