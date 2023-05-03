import { useRef } from "react"

export const useDebounce = () => {
    const debounceRef = useRef<NodeJS.Timeout>()
    return  (func: any, delay: number, args?: any[]) => {
        clearTimeout(debounceRef.current as NodeJS.Timeout)
        debounceRef.current = setTimeout(func, delay, args)
    }
}