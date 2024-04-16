/* eslint-disable max-len */
import {
  createContext, useContext, useMemo, ReactNode,
} from 'react'
import useLocalStorage from '../utils/useLocalStorage'

interface ExpensesContextProps {
  categories: Category[];
  labels: string[];
  createExpense(data: Expense): void;
  deleteExpense(categoryName: string, expenseId: string): void;
  modifyExpense(categoryName: string, expenseId: string, newExpenseData: Expense): void;
  totals: number[];
  addExpense: (category: Category, expense: Expense, setCategory: React.Dispatch<React.SetStateAction<Category>>) => void;
}
const initialState: ExpensesContextProps = {
  categories: [],
  addExpense: () => {},
  labels: [],
  totals: [],
  createExpense: () => {},
  deleteExpense: () => {},
  modifyExpense: () => {},

}
const initialCategory: Category[] = [{
  total: 0,
  name: 'Utilities',
  expenses: [],
}, {
  total: 0,
  name: 'Groceries',
  expenses: [],
},
{
  total: 0,
  name: 'Online Shopping',
  expenses: [],
}, {
  total: 0,
  name: 'Going Out',
  expenses: [],
},
]

const ExpensesContext = createContext<ExpensesContextProps>(initialState)

export function ExpensesProvider({ children }: { children: ReactNode }): JSX.Element {
  const [utilities, setUtilities] = useLocalStorage<Category>('Utilities', initialCategory[0])
  const [groceries, setGroceries] = useLocalStorage<Category>('Groceries', initialCategory[1])
  const [onlineShopping, setOnlineShopping] = useLocalStorage<Category>('Online Shopping', initialCategory[2])
  const [goingOut, setGoingOut] = useLocalStorage<Category>('Going Out', initialCategory[3])
  const categories = [utilities, groceries, onlineShopping, goingOut]
  const labels = categories.map((category) => category.name)
  const totals = categories.map((category) => category.total)

  // Helper function to add a new expense to a category
  const addExpense = (category: Category, expense: Expense, setCategory: React.Dispatch<React.SetStateAction<Category>>) => {
    const updatedCategory = {
      ...category,
      expenses: [...category.expenses, expense],
      total: category.total + expense.amount,
    }

    setCategory(updatedCategory)
  }

  const deleteExpense = (categoryName: string, expenseId: string) => {
    const categoryIndex = categories.findIndex((cat) => cat.name === categoryName)
    const category = categories[categoryIndex]
    const updatedExpenses = category.expenses.filter((expense) => expense.id !== expenseId)
    const updatedTotal = updatedExpenses.reduce((acc, curr) => acc + curr.amount, 0)

    const updatedCategory = {
      ...category,
      expenses: updatedExpenses,
      total: updatedTotal,
    }

    const setterMap = [setUtilities, setGroceries, setOnlineShopping, setGoingOut]

    setterMap[categoryIndex](updatedCategory)
  }

  const modifyExpense = (categoryName: string, expenseId: string, newExpenseData: Expense) => {
    const categoryIndex = categories.findIndex((cat) => cat.name === categoryName)
    const category = categories[categoryIndex]
    const updatedExpenses = category.expenses.map((expense) => (expense.id === expenseId ? { ...expense, ...newExpenseData } : expense))

    const updatedTotal = updatedExpenses.reduce((acc, curr) => acc + curr.amount, 0)

    const updatedCategory = {
      ...category,
      expenses: updatedExpenses,
      total: updatedTotal,
    }

    const setterMap = [setUtilities, setGroceries, setOnlineShopping, setGoingOut]

    setterMap[categoryIndex](updatedCategory)
  }

  function createExpense(data: Expense) {
    const currentDate = new Date()
    const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'short' }) // e.g., "Mon"
    const dayOfMonth = currentDate.getDate() // e.g., 30
    const month = currentDate.toLocaleString('en-US', { month: 'short' }) // e.g., "Jun"

    const dateString = `${dayOfWeek} ${month} ${dayOfMonth}` // e.g., "Mon Jun 30"

    const newExpense = {
      ...data,
      id: currentDate.toISOString(), // ISO string format for universal time stamp
      date: dateString, // Custom formatted date string "DayOfWeek Month DayOfMonth"
    }

    switch (data.category) {
      case 'Utilities':
        addExpense(utilities, newExpense, setUtilities)
        break
      case 'Groceries':
        addExpense(groceries, newExpense, setGroceries)
        break
      case 'Online Shopping':
        addExpense(onlineShopping, newExpense, setOnlineShopping)
        break
      case 'Going Out':
        addExpense(goingOut, newExpense, setGoingOut)
        break
      default:
        console.error('Invalid category')
    }
  }
  const value = useMemo(() => ({
    categories,
    addExpense,
    labels,
    totals,
    createExpense,
    deleteExpense,
    modifyExpense,

  }), [categories, labels, totals])

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export const useExpenses = () => {
  const context = useContext(ExpensesContext)

  if (!context) {
    throw new Error('useExpenses must be used within a ExpensesProvider')
  }

  return context
}
