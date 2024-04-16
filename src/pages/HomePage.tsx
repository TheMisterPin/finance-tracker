import { AddExpensesForm, ExpensesChart, Modal } from '../components'
import { ScreenFitText } from '../components/ui/responsiveText'
import { useExpenses } from '../hooks/context/ExpenseContext'
import ExpensesList from '../components/ExpensesList'

function Home() {
  const { totals, labels } = useExpenses()

  return (
    <>
  
      <ScreenFitText />
      <div className="w-screen flex ">
        <div className="flex-1 h-[75vh] overflow-y-clip px-24 pt-9">
          <ExpensesList />
          <Modal content={AddExpensesForm()} />
        </div>
        <div className="relative w-[45vw] flex-1">
          <ExpensesChart categories={labels} totals={totals} />

        </div>
      </div>
    </>
  )
}
export default Home
