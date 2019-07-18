import { Trigram } from '../../src/trigram'

describe('Trigrams', () => {
  it('should be only created with three words', () => {
    expect(() => {
      Trigram.create(['1', '2', '3', '4'])
    }).toThrow()

    expect(() => {
      Trigram.create(['1', '2'])
    }).toThrow()

    expect(() => {
      Trigram.create(['1', '2', '3'])
    }).not.toThrow()
  })

  it('should be created with the correct key', () => {
    const firstThree: string[] = ['The', 'first', 'three']
    const trigram: Trigram = Trigram.create(firstThree)
    expect(trigram.key).toEqual(
      firstThree
        .slice(0, 2)
        .join(' ')
        .toLowerCase()
    )
  })

  it('should have the correct value associated with its key', () => {
    const threeWords: string[] = ['one', 'two', 'three']
    const trigram: Trigram = Trigram.create(threeWords)
    expect(trigram.values).toContain(threeWords[2])
  })
})
