import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Register from './Register'

function renderRegister() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<p>Home page</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

describe('Register page', () => {
  beforeEach(() => localStorage.clear())

  it('shows the registration form', () => {
    renderRegister()

    expect(screen.getByText('Create an Account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('At least 6 characters')).toBeInTheDocument()
  })

  it('registers a user and navigates home', async () => {
    const user = userEvent.setup()
    renderRegister()

    await user.type(screen.getByPlaceholderText('Enter your name'), 'Alex')
    await user.type(screen.getByPlaceholderText('Enter your email'), 'alex@test.com')
    await user.type(screen.getByPlaceholderText('At least 6 characters'), 'secret123')
    await user.click(screen.getByRole('button', { name: 'Register' }))

    expect(await screen.findByText('Home page')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('shopease_user')).name)
      .toBe('Alex')
  })

  it('shows the short password message', () => {
    renderRegister()

    const form = screen.getByRole('button', { name: 'Register' }).closest('form')
    fireEvent.submit(form)

    expect(screen.getByText(
      'Password must be at least 6 characters.'
    )).toBeInTheDocument()
  })

  it('shows a message when the user is already registered', () => {
    localStorage.setItem('shopease_user', JSON.stringify({
      name: 'Alex',
      email: 'alex@test.com'
    }))

    renderRegister()

    expect(screen.getByText('You are already registered!'))
      .toBeInTheDocument()
  })
})
