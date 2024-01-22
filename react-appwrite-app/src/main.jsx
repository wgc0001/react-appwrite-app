import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Login from './pages/Login.jsx'
import Protected from './components/AuthLayout.jsx'
import Post from './pages/Post.jsx'
import Signup from './pages/Signup.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: (<Protected authentication = {false}> <Login/> </Protected>)
      },
      {
        path: "/signup",
        element: (<Protected authentication = {false}> <Signup/> </Protected>)
      },
      {
        path: "/all-posts",
        element: (<Protected authentication = {true}> <AllPosts/> </Protected>)
      },
      {
        path: "/add-posts",
        element: (<Protected authentication = {true}> <AddPost/> </Protected>)
      },
      {
        path: "/edit-post/:slug",
        element: (<Protected authentication = {true}> <EditPost/> </Protected>)
      },
      {
        path: "/post/:slug",
        element: (<Protected authentication = {true}> <Post/> </Protected>)
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={store}>
      <RouterProvider router = {router}/>
    </Provider>
  </React.StrictMode>,
)
