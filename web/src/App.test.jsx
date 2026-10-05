import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('increments the counter when the button is clicked', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: 'count is 0' })
    fireEvent.click(button)

    expect(button).toHaveTextContent('count is 1')
  })
})
