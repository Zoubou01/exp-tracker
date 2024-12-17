"use client"

import { useState, useEffect } from "react"
import { ExpenseForm } from "./components/ExpenseForm"
import { ExpenseList } from "./components/ExpenseList"
import { FinancialReport } from "./components/FinancialReport"
import { ExpensePieChart } from "./components/ExpensePieChart"
import { BudgetAlert } from "./components/BudgetAlert"

export type Expense = {
  id: string
  amount: number
  category: string
  date: string
  description: string
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [totalBudget, setTotalBudget] = useState(1000)
  const [currency, setCurrency] = useState("EUR")

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses')
    const savedBudget = localStorage.getItem('totalBudget')
    const savedCurrency = localStorage.getItem('currency')

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
    if (savedBudget) {
      setTotalBudget(parseFloat(savedBudget))
    }
    if (savedCurrency) {
      setCurrency(savedCurrency)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem('totalBudget', totalBudget.toString())
  }, [totalBudget])

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: Date.now().toString() }
    setExpenses([...expenses, newExpense])
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const updateBudget = (newBudget: number) => {
    setTotalBudget(newBudget)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} currency={currency} />
        </div>
        <div>
          <FinancialReport expenses={expenses} totalBudget={totalBudget} currency={currency} />
          <ExpensePieChart expenses={expenses} />
          <BudgetAlert expenses={expenses} totalBudget={totalBudget} onUpdateBudget={updateBudget} currency={currency} />
        </div>
      </div>
    </div>
  )
}

