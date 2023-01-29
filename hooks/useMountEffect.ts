import { useEffect } from "react"

export function useMountEffect(cb: () => void) {
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(cb, [])
}
