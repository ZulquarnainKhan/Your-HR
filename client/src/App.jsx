import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import UploadResume from './pages/UploadResume';

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/uploadResume', element: <UploadResume/> },
  ])

  return (
    
      <RouterProvider router={router} />
    
  )
}

export default App
