import CardButtons from '../ui/cardButton'

export default function ExpenseCard(expense : Expense) {
  const {
    name, amount, date, id, category,
  } = expense

  return (
    <div>
      <h2>{name}</h2>
      <p>{amount}</p>
      <p>{date}</p>
      <CardButtons categoryName={category} expenseId={id} />
    </div>
  )
}
