function ExpenseIcon(category : string) {
  switch (category) {
    case 'food':
      return '🍔'
    case 'transport':
      return '🚌'
    case 'entertainment':
      return '🎬'
    case 'health':
      return '💊'
    case 'education':
      return '🎓'
    case 'other':
      return '💰'
    default:
      return '💰'
  }
}
export default ExpenseIcon
