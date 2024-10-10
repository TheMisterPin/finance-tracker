"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, DollarSign } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

type Transaction = {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  date: string
}

type Bill = {
  id: string
  name: string
  amount: number
  dueDate: string
}

type SavingsGoal = {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
}

export function BudgetTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [bills, setBills] = useState<Bill[]>([])
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [newTransaction, setNewTransaction] = useState({ type: 'expense', category: '', amount: '', date: '' })
  const [newBill, setNewBill] = useState({ name: '', amount: '', dueDate: '' })
  const [newSavingsGoal, setNewSavingsGoal] = useState({ name: '', targetAmount: '', currentAmount: '' })

  const incomeCategories = ['Work', 'Side Sales']
  const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Rent', 'Other']
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']

  const addTransaction = () => {
    if (newTransaction.category && newTransaction.amount && newTransaction.date) {
      setTransactions([...transactions, { ...newTransaction, id: Date.now().toString(), amount: parseFloat(newTransaction.amount) }] as Transaction[])
      setNewTransaction({ type: 'expense', category: '', amount: '', date: '' })
    }
  }

  const addBill = () => {
    if (newBill.name && newBill.amount && newBill.dueDate) {
      setBills([...bills, { ...newBill, id: Date.now().toString(), amount: parseFloat(newBill.amount) }])
      setNewBill({ name: '', amount: '', dueDate: '' })
    }
  }

  const addSavingsGoal = () => {
    if (newSavingsGoal.name && newSavingsGoal.targetAmount) {
      setSavingsGoals([...savingsGoals, { ...newSavingsGoal, id: Date.now().toString(), targetAmount: parseFloat(newSavingsGoal.targetAmount), currentAmount: parseFloat(newSavingsGoal.currentAmount) || 0 }])
      setNewSavingsGoal({ name: '', targetAmount: '', currentAmount: '' })
    }
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const deleteBill = (id: string) => {
    setBills(bills.filter(b => b.id !== id))
  }

  const deleteSavingsGoal = (id: string) => {
    setSavingsGoals(savingsGoals.filter(g => g.id !== id))
  }

  const calculateTotalIncome = () => transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const calculateTotalExpenses = () => transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

  const expenseData = expenseCategories.map(category => ({
    name: category,
    value: transactions.filter(t => t.type === 'expense' && t.category === category).reduce((sum, t) => sum + t.amount, 0)
  })).filter(item => item.value > 0)

  const incomeData = incomeCategories.map(category => ({
    name: category,
    value: transactions.filter(t => t.type === 'income' && t.category === category).reduce((sum, t) => sum + t.amount, 0)
  })).filter(item => item.value > 0)

  const budgetVsActualData = expenseCategories.map(category => {
    const budgeted = 1000 // Example budgeted amount, replace with actual logic
    const actual = transactions.filter(t => t.type === 'expense' && t.category === category).reduce((sum, t) => sum + t.amount, 0)
    return { name: category, Budgeted: budgeted, Actual: actual }
  })

  return (
    <div className="container min-h-screen p-4 mx-auto font-sans bg-yellow-200">
      <h1 className="inline-block p-4 mb-8 text-5xl font-bold text-center transform bg-red-400 -rotate-2">Neobrutalist Budget Tracker</h1>

      {/* Income and Expense Tracking */}
      <div className="mb-8 bg-blue-300 p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Add Transaction</h2>
        <div className="flex flex-wrap gap-4">
          <Select
            value={newTransaction.type}
            onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value as 'income' | 'expense', category: '' })}
          >
            <SelectTrigger className="w-[180px] border-4 border-black text-xl">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newTransaction.category}
            onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
          >
            <SelectTrigger className="w-[180px] border-4 border-black text-xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {newTransaction.type === 'income'
                ? incomeCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))
                : expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))
              }
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Button onClick={addTransaction} className="p-2 text-xl font-bold text-black transition-transform duration-200 transform bg-green-400 border-4 border-black hover:bg-green-500 hover:-translate-y-1">
            <PlusCircle className="w-6 h-6 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="mb-8 bg-green-300 p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform -rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Transactions</h2>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-2 mb-2 bg-white border-2 border-black">
            <span className="text-xl">{transaction.category}</span>
            <span className={`text-xl ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </span>
            <Button onClick={() => deleteTransaction(transaction.id)} className="p-1 text-black bg-red-400 border-2 border-black hover:bg-red-500">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Visual Budget Breakdown */}
      <div className="mb-8 bg-purple-300 p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Budget Breakdown</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-2xl font-bold">Expenses</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-bold">Income</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Goals Visualizer */}
      <div className="mb-8 bg-pink-300 p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform -rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Savings Goals</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Input
            placeholder="Goal Name"
            value={newSavingsGoal.name}
            onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, name: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Input
            type="number"
            placeholder="Target Amount"
            value={newSavingsGoal.targetAmount}
            onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, targetAmount: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Input
            type="number"
            placeholder="Current Amount"
            value={newSavingsGoal.currentAmount}
            onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, currentAmount: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Button onClick={addSavingsGoal} className="p-2 text-xl font-bold text-black transition-transform duration-200 transform bg-green-400 border-4 border-black hover:bg-green-500 hover:-translate-y-1">
            <PlusCircle className="w-6 h-6 mr-2" />
            Add Goal
          </Button>
        </div>
        {savingsGoals.map((goal) => (
          <div key={goal.id} className="p-4 mb-4 bg-white border-4 border-black">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold">{goal.name}</span>
              <Button onClick={() => deleteSavingsGoal(goal.id)} className="p-1 text-black bg-red-400 border-2 border-black hover:bg-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-pink-600 uppercase bg-pink-200 rounded-full">
                    {((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}% Complete
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-semibold text-pink-600">
                    ${goal.currentAmount} / ${goal.targetAmount}
                  </span>
                </div>
              </div>
              <div className="flex h-6 mb-4 overflow-hidden text-xs bg-pink-200 border-2 border-black rounded-full">
                <div style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }} className="flex flex-col justify-center text-center text-white bg-pink-500 shadow-none whitespace-nowrap"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Reminder System */}
      <div className="mb-8 bg-orange-300 p-6 rounded-lg  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Bill Reminders</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Input
            placeholder="Bill Name"
            value={newBill.name}
            onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newBill.amount}
            onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Input
            type="date"
            value={newBill.dueDate}
            onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
            className="p-2 text-xl border-4 border-black"
          />
          <Button onClick={addBill} className="p-2 text-xl font-bold text-black transition-transform duration-200 transform bg-green-400 border-4 border-black hover:bg-green-500 hover:-translate-y-1">
            <PlusCircle className="w-6 h-6 mr-2" />
            Add Bill
          </Button>
        </div>
        {bills.map((bill) => (
          <div key={bill.id} className="p-4 mb-2 transform bg-white border-4 border-black -rotate-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{bill.name}</span>
              <span className="text-xl">${bill.amount}</span>
              <span className="text-lg">Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
              <Button onClick={() => deleteBill(bill.id)} className="p-1 text-black bg-red-400 border-2 border-black hover:bg-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Budget vs. Actual Comparison */}
      <div className="mb-8 bg-cyan-300 p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform -rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Budget vs. Actual</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetVsActualData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Budgeted" fill="#8884d8" />
              <Bar dataKey="Actual" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* "Money Flow" Timeline */}
      <div className="mb-8 bg-lime-300 p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Money Flow Timeline</h2>
        <div className="space-y-4">
          {transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((transaction) => (
            <div key={transaction.id} className="flex items-center p-2 space-x-4 bg-white border-2 border-black">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                {transaction.type === 'income' ? <DollarSign className="w-6 h-6 text-white" /> : <Trash2 className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold">{transaction.category}</p>
                <p className="text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black transform -rotate-1">
        <h2 className="mb-4 text-3xl font-bold">Summary</h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-green-200 border-4 border-black">
            <p className="text-2xl font-bold">Total Income</p>
            <p className="text-3xl text-green-600">${calculateTotalIncome().toFixed(2)}</p>
          </div>
          <div className="p-4 bg-red-200 border-4 border-black">
            <p className="text-2xl font-bold">Total Expenses</p>
            <p className="text-3xl text-red-600">${calculateTotalExpenses().toFixed(2)}</p>
          </div>
          <div className="col-span-2 p-4 bg-blue-200 border-4 border-black">
            <p className="text-2xl font-bold">Balance</p>
            <p className="text-3xl text-blue-600">${(calculateTotalIncome() - calculateTotalExpenses()).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}