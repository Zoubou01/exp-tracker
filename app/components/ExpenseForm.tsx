"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ExpenseFormProps = {
  onAddExpense: (expense: { amount: number; category: string; date: string; description: string }) => void
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && category && date) {
      onAddExpense({
        amount: parseFloat(amount),
        category,
        date,
        description,
      })
      setAmount("")
      setCategory("")
      setDate(new Date().toISOString().split('T')[0])
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <Select value={category} onValueChange={setCategory} required>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="transportation">Transportation</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="utilities">Utilities</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <Button type="submit">Add Expense</Button>
    </form>
  )
}

