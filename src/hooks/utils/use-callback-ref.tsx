import { useState, useCallback, RefCallback } from 'react'

function useCallbackRef<T>(): [T | null, RefCallback<T>] {
  const [ref, setRef] = useState<T | null>(null)

  const fn = useCallback<RefCallback<T>>((node: T | null) => {
    setRef(node)
  }, [])

  return [ref, fn]
}

export default useCallbackRef
