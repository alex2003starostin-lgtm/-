import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DepartmentPage from './pages/DepartmentPage'
import FormPage from './pages/FormPage'
import ConfirmationPage from './pages/ConfirmationPage'
import MyTicketsPage from './pages/MyTicketsPage'
import AdminPage from './pages/AdminPage'
import AdminFormBuilderPage from './pages/AdminFormBuilderPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dept/:deptId" element={<DepartmentPage />} />
          <Route path="/form/:formId" element={<FormPage />} />
          <Route path="/tickets" element={<MyTicketsPage />} />
          <Route path="/confirmation/:ticketId" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new" element={<AdminFormBuilderPage />} />
          <Route path="/admin/edit/:formId" element={<AdminFormBuilderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
