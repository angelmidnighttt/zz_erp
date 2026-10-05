import { mapOrder } from '~/utils/sorts'
import { describe, it, expect } from '@jest/globals'

describe('mapOrder', () => {
  it('sorts items by the given order without mutating the original array', () => {
    const original = [
      { id: 'id-1', name: 'One' },
      { id: 'id-2', name: 'Two' },
      { id: 'id-3', name: 'Three' }
    ]

    const result = mapOrder(original, ['id-3', 'id-1', 'id-2'], 'id')

    expect(result.map((item) => item.id)).toEqual(['id-3', 'id-2', 'id-2'])
    expect(original.map((item) => item.id)).toEqual(['id-1', 'id-2', 'id-3'])
  })
})
