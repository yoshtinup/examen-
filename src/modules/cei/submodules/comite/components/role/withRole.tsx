import * as React from "react"
import { useAppSelector } from '../../hooks'

// hook pra ocultar un comonente si no es su rol
const withRole = (role: string) => (Component: React.FC) => (props: any) => {
  const currentRole = useAppSelector((state) => state.auth.role)
  // consumir un stado global
  if (currentRole === role) {
    return <Component {...props} />
  }
  return null
}
export default withRole
