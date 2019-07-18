/**
 * Trigrams are sets of three words,
 * with the first two being the key
 * and the last being the associated value.
 */
export interface Trigram {
  key: string
  values: string[]
}

export class Trigram {
  /**
   * Creates a trigram from three words.
   * All words are converted to lower-case.
   */
  public static create(words: string[]): Trigram {
    if (words.length !== 3) {
      throw new Error('Trigrams can only be constructed with three words.')
    }

    const key = words
      .slice(0, 2)
      .join(' ')
      .toLowerCase()

    const values: string[] = [words[2].toLowerCase()]

    return { key, values }
  }

  /**
   * Generates a key from the second word of the given trigram followed by the given string `secondWord`.
   */
  public static createKeyFrom(key: string, secondWord: string): string {
    const firstWord: string = key.split(' ')[1]
    return `${firstWord} ${secondWord}`.toLowerCase()
  }
}
