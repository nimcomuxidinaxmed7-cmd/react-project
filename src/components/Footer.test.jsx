import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('shows the store name', () => {
    render(<Footer />)
    expect(screen.getByText('Shopease')).toBeInTheDocument()
  })

  it('shows the shopping message and year', () => {
    render(<Footer />)
    expect(screen.getByText('Shopping made simple.')).toBeInTheDocument()
    expect(screen.getByText('2026 Shopease')).toBeInTheDocument()
  })
})
