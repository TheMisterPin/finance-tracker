/* eslint-disable max-len */
import { useForm, FormProvider } from 'react-hook-form'
import { useExpenses } from '../../hooks/context/ExpenseContext'
import { Text } from '../ui'
import CategorySelect from '../ui/categorySelect'

export default function AddExpensesForm() {
  const methods = useForm<Expense>({
    mode: 'onChange',
  })
  const { createExpense } = useExpenses()

  const onSubmit = methods.handleSubmit((data) => createExpense(data))

  return (
    <FormProvider {...methods}>
      {' '}
      {/* This will provide the form context to all child components */}
      <div className="glass p-6">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Text text="Add A New Expense" type="title" />

          <label htmlFor="name" className="flex flex-col gap-2">
            Name
            <input
              {...methods.register('name', { required: 'Name is required' })}
              placeholder="Expense name"
              type="text"
              className={`input ${methods.formState.errors.name ? 'input-error' : ''}`}
            />
            {methods.formState.errors.name && <span className="text-red-500 text-sm">{methods.formState.errors.name.message}</span>}
          </label>

          <label htmlFor="amount" className="flex flex-col gap-2">
            Amount
            <input
              {...methods.register('amount', { required: 'Amount is required', valueAsNumber: true })}
              placeholder="Amount"
              type="number"
              className={`text-gray-600 input ${methods.formState.errors.amount ? 'input-error' : ''}`}
            />
            {methods.formState.errors.amount && <span className="text-red-500 text-sm">{methods.formState.errors.amount.message}</span>}
          </label>

          <CategorySelect />
          {' '}
          {/* Using the custom CategorySelect component */}

          <input type="submit" value="Add Expense" className=" w-1/2 cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-600 text-white p-2" />
        </form>
      </div>
    </FormProvider>
  )
}
