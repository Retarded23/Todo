import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Todo from './components/Todo';      // Your new Todo component      // Example Home component
import Login from './components/Login';   
import SignIn from './components/SignIn';     // Example Login component
 // Optional 404 page

function App() {
  return (
    <>
      <NavBar />  {/* NavBar usually goes outside Routes to appear on all pages */}
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        
      </Routes>
    </>
  );
}

export default App;
