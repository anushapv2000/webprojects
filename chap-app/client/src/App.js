import React from 'react';
 
import { BrowserRouter as Router,Route} from 'react-router-dom'; // inorder to work with socket io and all
//router and route are the two component which is used later on in app function
//arrow based component here, 
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

//
//route path in Route
//
//when the user join the page,he or she will be greeted with join component 
//where he will fill the login form,through the query we will pass the data
//to chat .once data is recieved chat component is recieved
const App=()=>(
<Router>
        <Route path="/" exact component ={Join}></Route>
        <Route path="/chat" component ={Chat}></Route>
</Router>
);

export default App;
