import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/HomePage'
import Summary from './pages/SummaryPage'
import { ExpensesProvider } from './hooks'
import PageContainer from './components/containers/pageContainer'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/summary', element: <Summary /> },
])

function App() {
  return (
    <ExpensesProvider>
      <PageContainer>
        <RouterProvider router={router} />
      </PageContainer>
    </ExpensesProvider>
  )
}

export default App
