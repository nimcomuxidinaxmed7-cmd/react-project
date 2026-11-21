import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from './AuthContext'

function TestComponent() {
  const { user, register, logout } = useAuth()

  return (
    <div>
      <p>{user ? user.name : 'No user'}</p>
      <button onClick={() => register('Alex', 'alex@test.com')}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => localStorage.clear())

  it('starts without a user', () => {
    render(<AuthProvider><TestComponent /></AuthProvider>)
    expect(screen.getByText('No user')).toBeInTheDocument()
  })

  it('registers and saves a user', async () => {
    const user = userEvent.setup()
    render(<AuthProvider><TestComponent /></AuthProvider>)

    await user.click(screen.getByText('Register'))

    expect(screen.getByText('Alex')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('shopease_user')).email)
      .toBe('alex@test.com')
  })

  it('logs out and removes saved user', async () => {
    const user = userEvent.setup()
    render(<AuthProvider><TestComponent /></AuthProvider>)

    await user.click(screen.getByText('Register'))
    await user.click(screen.getByText('Logout'))

    expect(screen.getByText('No user')).toBeInTheDocument()
    expect(localStorage.getItem('shopease_user')).toBeNull()
  })

  it('loads a saved user', () => {
    localStorage.setItem('shopease_user', JSON.stringify({
      name: 'Sam',
      email: 'sam@test.com'
    }))

    render(<AuthProvider><TestComponent /></AuthProvider>)
    expect(screen.getByText('Sam')).toBeInTheDocument()
  })
})
