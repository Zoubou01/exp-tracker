import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Expense } from "../page"

type FinancialReportProps = {
  expenses: Expense[]
  totalBudget: number
  currency: string
}

export function FinancialReport({ expenses, totalBudget, currency }: FinancialReportProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingBudget = totalBudget - totalExpenses

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Financial Report</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total Budget: {currency === "EUR" ? "€" : currency} {totalBudget.toFixed(2)}</p>
        <p>Total Expenses: {currency === "EUR" ? "€" : currency} {totalExpenses.toFixed(2)}</p>
        <p>Remaining Budget: {currency === "EUR" ? "€" : currency} {remainingBudget.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}

