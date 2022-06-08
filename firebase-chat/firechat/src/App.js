import React from 'react'
import './App.css'
import Chat from './components/Chat'
import SignIn from './components/SignIn';
import {auth} from './firebase.js'
import {useAuthState} from 'react-firebase-hooks/auth'
const App=()=>{
  const [user]=useAuthState(auth)
    
  return(
    <>
   
    {user ? <Chat />:<SignIn />}
       </>
  );
   
}
export default App;
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


