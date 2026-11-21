import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import { AuthProvider } from '../context/AuthContext'

function renderNavbar() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/cart']}>
        <Navbar />
        <Routes>
          <Route path="/" element={<p>Home page</p>} />
          <Route path="/cart" element={<p>Cart page</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

describe('Navbar', () => {
  beforeEach(() => localStorage.clear())

  it('shows the ShopEase name and navigation links', () => {
    renderNavbar()
    expect(screen.getByText('ShopEase')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
  })

  it('shows Register when nobody is logged in', () => {
    renderNavbar()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('shows the user name and logs out', async () => {
    localStorage.setItem('shopease_user', JSON.stringify({
      name: 'Alex',
      email: 'alex@test.com'
    }))

    const user = userEvent.setup()
    renderNavbar()

    expect(screen.getByText('Hi, Alex')).toBeInTheDocument()
    await user.click(screen.getByText('Logout'))

    expect(screen.getByText('Home page')).toBeInTheDocument()
    expect(localStorage.getItem('shopease_user')).toBeNull()
  })
})
