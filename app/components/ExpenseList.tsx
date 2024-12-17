import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Expense } from "../page"

type ExpenseListProps = {
  expenses: Expense[]
  onDeleteExpense: (id: string) => void
  currency: string
}

export function ExpenseList({ expenses, onDeleteExpense, currency }: ExpenseListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell><Button variant="destructive" onClick={() => onDeleteExpense(expense.id)}>
                Delete
              </Button>
            </TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{`${currency === "EUR" ? "€" : currency} ${expense.amount.toFixed(2)}`}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell>
                {expense.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

