/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { useState, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import useCallbackRef from './use-callback-ref'

interface Bounds {
  width: number;
  height: number;
}

function useMeasure<T extends Element>(): [{ width: number; height: number }, React.RefCallback<T>] {
  const [element, attachRef] = useCallbackRef<T>()
  const [bounds, setBounds] = useState<Bounds>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!element) return

    function onResize([entry]: ResizeObserverEntry[]): void {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    }

    const observer = new ResizeObserver(onResize)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [element])

  return [bounds, attachRef]
}

export default useMeasure
