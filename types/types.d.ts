type CategoryName = 'Utilities' | 'Groceries' | 'Online Shopping' | 'Going Out' | 'Misc'

interface Expense {
  name: string;
  amount: number;
  category: CategoryName;
  id: string;
  date : string
}

interface Category {
  total: number;
  name: CategoryName;
  expenses: Expense[];
}
