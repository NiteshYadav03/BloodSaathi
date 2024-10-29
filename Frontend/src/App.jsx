import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/signup/SignUp'
import SignIn from './components/SignIn'
import About from './components/About'
import UserDashboard from './components/UserDashboard/UserDashboard'
import HospitalDashboard from './components/HospitalDashboard/HospitalDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import ChatbotPage from './components/ChatBotPage'
import FaqSection from './components/FaqSection'
import BloodRequestManager from './components/AdminDashboard/BloodRequestManager'
import InspirationalStory from './components/InspirationalStory'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/signin',
    element:<SignIn/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
path:'/faqs',
element:<FaqSection/>
  },
  {
    path:'/userdashboard',
    element:<UserDashboard/>
  },
  {
    path:'/adminDashboard',
    element:<AdminDashboard/> // Add more routes for different hospital pages here, e.g., /hospitals/:hospitalId/donors, /hospitals/:hospitalId/services, etc.
  },
  {
    path:'/hospitaldashboard',
    element:<HospitalDashboard/>
  },
  {
    path:'/chat',
    element:<ChatbotPage/>
  },
  {
    path:'/blood-requests',
    element:<BloodRequestManager/>
  },
  {
    path:'/stories',
    element:<InspirationalStory/>
  }

])

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
