import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './screen/Home'
import About from './screen/About'
import Cart from './components/Cart'
import Login from './screen/Login'
import Signup from './screen/Signup'
import PrivateRoute from './components/PrivateRoute'



export default function App() {
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}




//code for gitlab integration

// image: node:20  # Use official Node.js image

// stages:
//   - install
//   - lint
//   - test
//   - build
//   - deploy

// variables:
//   NODE_ENV: 'production'
//   DATABASE_URL: "postgresql://$DB_USER:$DB_PASS@$DB_HOST:5432/$DB_NAME"

// cache:
//   paths:
//     - node_modules/

// before_script:
//   - npm install -g sequelize-cli jest  # Ensure Jest is installed globally

// install_backend:
//   stage: install
//   script:
//     - cd backend
//     - npm install
//   artifacts:
//     paths:
//       - backend/node_modules/

// install_frontend:
//   stage: install
//   script:
//     - cd frontend
//     - npm install
//   artifacts:
//     paths:
//       - frontend/node_modules/

// test_backend:
//   stage: test
//   script:
//     - npm install --save-dev jest
//     - cd backend
//     - npm test

// build_frontend:
//   stage: build
//   script:
//     - cd frontend
//     - npm run build
//   artifacts:
//     paths:
//       - frontend/dist/

// deploy_backend:
//   stage: deploy
//   only:
//     - main  # Only deploy when pushing to main branch
//   script:
//     - cd backend
//     - npm run start:prod  # Or use PM2: pm2 start npm --name "backend" -- run start

// deploy_frontend:
//   stage: deploy
//   only:
//     - main
//   script:
//     - cd frontend
//     - npm install -g serve
//     - serve -s dist -l 3000
