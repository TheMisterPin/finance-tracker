/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable max-len */
import { useFormContext } from 'react-hook-form' // This will allow us to use the same form context
import {
  FiHome, FiShoppingCart, FiDollarSign, FiCoffee,
} from 'react-icons/fi'
import { IconContext } from 'react-icons'

export default function CategorySelect() {
  const { register, formState: { errors } } = useFormContext() // useFormContext to use the form state managed by react-hook-form

  return (
    <div className="relative">
      <label htmlFor="category" className="block text-sm font-medium ">
        Category
        <select
          id="category"
          {...register('category', { required: 'This field is required' })}
          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 text-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a category</option>
          <option value="Utilities" className="flex items-center">
            Utilities
            {' '}
            <IconContext.Provider value={{ className: 'ml-2' }}><FiHome /></IconContext.Provider>
          </option>
          <option value="Groceries" className="flex items-center">
            Groceries
            {' '}
            <IconContext.Provider value={{ className: 'ml-2' }}><FiShoppingCart /></IconContext.Provider>
          </option>
          <option value="Online Shopping" className="flex items-center">
            Online Shopping
            {' '}
            <IconContext.Provider value={{ className: 'ml-2' }}><FiDollarSign /></IconContext.Provider>
          </option>
          <option value="Going Out" className="flex items-center">
            Going Out
            {' '}
            <IconContext.Provider value={{ className: 'ml-2' }}><FiCoffee /></IconContext.Provider>
          </option>
        </select>

        {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
      </label>
    </div>
  )
}
