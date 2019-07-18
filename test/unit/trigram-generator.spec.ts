import { TrigramGenerator } from '../../src/trigram-generator'
import { Trigram } from '../../src/trigram'

describe('TrigramGenerator', () => {
  const longSampleInput =
    'Electric scooters are one of the most recent parts of the “sharing economy” to emerge. Companies like LimeBike, Bird, and Spin offer apps that allow users to find a scooter and ride it to their desired location. The app then charges the user a price typically based on how long the scooter was used.'
  const longSampleTrigramMap: Map<string, Trigram> = TrigramGenerator.generateTrigramMap(longSampleInput)

  it('throws when given invalid constructor params', () => {
    expect(() => new TrigramGenerator('')).toThrow()
    expect(() => new TrigramGenerator('Only two')).toThrow()
    expect(() => new TrigramGenerator('Three words now')).not.toThrow()
  })

  it('should generate the appropriate trigrams', () => {
    const input = 'I wish I may I wish I might'
    const trigramMap: Map<string, Trigram> = TrigramGenerator.generateTrigramMap(input)
    expect(trigramMap.get('i wish')!.values).toEqual(['i', 'i'])
    expect(trigramMap.get('wish i')!.values).toEqual(['may', 'might'])
    expect(trigramMap.get('may i')!.values).toEqual(['wish'])
    expect(trigramMap.get('i may')!.values).toEqual(['i'])
  })

  it('generates text with seed words', () => {
    const seedWords: string[] = ['recent', 'parts']
    const generatedText: string = TrigramGenerator.generateRandomText(longSampleTrigramMap, seedWords)
    const seedWordsJoined: string = seedWords.join(' ')
    expect(generatedText.startsWith(seedWordsJoined)).toBeTruthy()

    console.log(generatedText)
  })

  it('will generate a maximum # of words', () => {
    function testGeneratedTextLength(trigramMap: Map<string, Trigram>, maxWords: number) {
      const generatedText: string = TrigramGenerator.generateRandomText(trigramMap, undefined, maxWords)
      const words: string[] = generatedText.length > 0 ? generatedText.split(' ') : []
      // At least two words are created (trigram key)
      expect(words.length).toBeGreaterThanOrEqual(2)
      expect(words.length).toBeLessThanOrEqual(maxWords)
    }
    testGeneratedTextLength(longSampleTrigramMap, 2)
    testGeneratedTextLength(longSampleTrigramMap, 10)
    testGeneratedTextLength(longSampleTrigramMap, 100)
    testGeneratedTextLength(longSampleTrigramMap, 53)
  })
})
