import './App.css';
import TweetAdd from './pages/tweetAdd';
import Profile from './pages/login';
import Auth from './pages/authentication';
import Navbar from './components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useContext } from 'react';
import { TweetsAddContext } from './context/contextAdd';





function App () {
  const {userLog,setUserLog} = useContext(TweetsAddContext)



  return (
    <> 
     <Navbar />
    <Routes>
     
      
    
    <Route path='/home' element= { <div className="App"> 
      <TweetAdd /> 
  
    </div>} />
      <Route path='/profile' element={<Profile/> } />
      
     
    <Route path='/' element= {<Auth/>} />
    
    </Routes>
    </>
   
  );
}

export default App;
