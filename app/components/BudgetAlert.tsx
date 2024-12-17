import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Expense } from "../page"

type BudgetAlertProps = {
  expenses: Expense[]
  totalBudget: number
  onUpdateBudget: (newBudget: number) => void
  currency: string
}

export function BudgetAlert({ expenses, totalBudget, onUpdateBudget, currency }: BudgetAlertProps) {
  const [newBudget, setNewBudget] = useState("")
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const budgetUsagePercentage = (totalExpenses / totalBudget) * 100

  const handleUpdateBudget = () => {
    const parsedBudget = parseFloat(newBudget)
    if (!isNaN(parsedBudget) && parsedBudget > 0) {
      onUpdateBudget(parsedBudget)
      setNewBudget("")
    }
  }

  return (
    <div className="mb-4">
      <Alert variant={budgetUsagePercentage >= 80 ? "destructive" : "default"}>
        <AlertTitle>Budget Alert</AlertTitle>
        <AlertDescription>
          You have used {budgetUsagePercentage.toFixed(2)}% of your budget.
        </AlertDescription>
      </Alert>
      <Progress value={budgetUsagePercentage} className="mt-2" />
      <div className="mt-2 flex space-x-2">
        <Input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder={`New budget (${currency})`}
        />
        <Button onClick={handleUpdateBudget}>Update Budget</Button>
      </div>
    </div>
  )
}

