import { Trigram } from './trigram'

export class TrigramGenerator {
  public readonly trigramMap: Map<string, Trigram>

  constructor(input: string) {
    if (!this.isInputValid(input)) {
      throw new Error('Input cannot be empty')
    }
    this.trigramMap = TrigramGenerator.generateTrigramMap(input)
  }

  private isInputValid(input: string): boolean {
    return input != null && input.length > 0
  }

  /**
   * @param seedWords Two starting words of an existing trigram.
   * @param maxWords The maximum number of words to generate.
   */
  public generateRandomText(seedWords?: string[], maxWords?: number): string {
    return TrigramGenerator.generateRandomText(this.trigramMap, seedWords, maxWords)
  }

  private static getRandomTrigramValue(trigram: Trigram): string {
    const length: number = trigram.values.length
    const randomIndex: number = Math.floor(Math.random() * length)
    return trigram.values[randomIndex]
  }

  public static generateTrigramMap(input: string): Map<string, Trigram> {
    const words: string[] = input.split(' ')
    if (words.length < 3) {
      throw new Error('Need at least three words to generate trigrams.')
    }
    const trigramMap: Map<string, Trigram> = new Map()
    // Length - 2 ensures we're grabbing the last available set of three words.
    for (let i = 0; i < words.length - 2; i++) {
      const trigram: Trigram = Trigram.create(words.slice(i, i + 3))
      const key: string = trigram.key
      const existingTrigram: Trigram | undefined = trigramMap.get(key)
      if (existingTrigram != null) {
        trigram.values.forEach(value => existingTrigram.values.push(value))
      } else {
        trigramMap.set(key, trigram)
      }
    }
    return trigramMap
  }

  /**
   * @param trigramMap A map of two words to a trigram.
   * @param seedWords Two starting words of an existing trigram.
   */
  public static generateRandomText(
    trigramMap: Map<string, Trigram>,
    seedWords?: string[],
    maxWords: number = Number.MAX_VALUE
  ): string {
    const startingKey: string = seedWords != null ? seedWords.join(' ') : trigramMap.keys().next().value
    let trigram: Trigram | undefined = trigramMap.get(startingKey)
    const generated: string[] = []
    // First two words are picked at the start, so max word count is decreased by two.
    while (trigram != undefined && generated.length < maxWords - 2) {
      const nextWord: string = TrigramGenerator.getRandomTrigramValue(trigram)
      generated.push(nextWord)

      // Generate a new key used to find the following trigram.
      const nextKey: string = Trigram.createKeyFrom(trigram!.key, nextWord)
      trigram = trigramMap.get(nextKey)
    }
    return generated.length === 0 ? startingKey : `${startingKey} ${generated.join(' ')}`
  }
}
