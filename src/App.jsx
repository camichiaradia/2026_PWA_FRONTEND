import React from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import AuthContextProvider from './Context/AuthContext'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import WorkspaceContextProvider from './Context/WorkspaceContext'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen'
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen'
import ChannelMessageScreen from './Screens/ChannelMessageScreen/ChannelMessageScreen'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* Rutas Públicas */}
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />

        {/* Rutas Protegidas por Middleware */}
        <Route element={<AuthMiddleware />}>
          {/* El Provider envuelve el Outlet para que Home y Detail compartan la lista */}
          <Route element={
            <WorkspaceContextProvider>
              <Outlet />
            </WorkspaceContextProvider>
          }>
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/create-workspace' element={<CreateWorkspaceScreen />} />
            <Route path='/workspace/:workspace_id' element={<WorkspaceDetailScreen />} />
            <Route path='/workspace/:workspace_id/channel/:channel_id' element={<ChannelMessageScreen />} />
            <Route path='/workspace/:workspace_id/channel/:channel_id/message' element={<ChannelMessageScreen />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App
/* function App() {


  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route element={<AuthMiddleware />}>
          <Route path='/home' element={
            <WorkspaceContextProvider>
              <HomeScreen />
            </WorkspaceContextProvider>
          } />
          <Route path='/create-workspace' element={
            <WorkspaceContextProvider>
              <CreateWorkspaceScreen />
            </WorkspaceContextProvider>
          } />
          <Route path='/workspace/:workspace_id' element={
            <WorkspaceContextProvider>
              <WorkspaceDetailScreen />
            </WorkspaceContextProvider>
          } />
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App */