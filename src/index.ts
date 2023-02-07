import { useCookie } from '#imports'

export function runConsole() {
  const session = useCookie('session/token')

  console.log('Console running...' + session)
}
