import { IPhrase }  from '../../reducers/searches'

class PhraseNode {
  word: string
  level: number 
  phraseEndingsData: IPhrase[]
  // phraseStartIds: Array<number>  // Multiple search phrases can start here.
  // phraseEndIds: Array<number>  // Multiple search phrases can end here.
  children: { [word:string] : PhraseNode } = {}  //  Array<TrieNode> = [] 

  constructor(
    word: string, 
    level: number, 
    phraseEndingsData: IPhrase[] = []  // required: search name, more?
    // phraseStartId: Array<number>  = [],
    // phraseEndId: Array<number> = [],
  ) {
    this.word = word
    this.level = level
    this.phraseEndingsData = phraseEndingsData
    // this.phraseStartId = phraseStartId
    // this.phraseEndId = phraseEndId
  }
}

export default class SearchesTrie {
  root: PhraseNode

  constructor() {
    this.root = new PhraseNode(' ', 0)
  }

  addPhrase(phrase: IPhrase) {
    const wordsLeft: string[] = phrase.text.split(' ')  
    this.populatePhraseTrie(this.root, wordsLeft, phrase)
  }

  populatePhraseTrie(parent: PhraseNode, wordsLeft: string[], phrase: IPhrase) {
    // TODO: Move from using words to using chars
    let hasChild: boolean = false
    let nextNode: PhraseNode = new PhraseNode(' ', 0)

    // parent.children.map(child => {
    // words.map(word => {
    //   if (parent.children.hasOwnProperty(word)) {
    //     hasChild = true
    //     nextNode = parent.children[word]
    //   }
    // })

    if (parent.children.hasOwnProperty(wordsLeft[0])) {
      hasChild = true
      nextNode = parent.children[wordsLeft[0]]
    }

    if (!hasChild) {
      nextNode = new PhraseNode(wordsLeft[0], parent.level + 1)
      parent.children[nextNode.word] = nextNode
    }

    // Move to the next word.
    wordsLeft.shift()
    
    if (wordsLeft.length > 0) {
      this.populatePhraseTrie(nextNode, wordsLeft, phrase)
    } else {
      nextNode.phraseEndingsData.push(phrase)
    }
  }

  // TODO: Implement proper logic here.
  findString(
    root: PhraseNode, 
    text: string, 
    foundPhrases: IPhrase[] = []
  ): IPhrase[] {
    let currentNode: PhraseNode = root
    let textWords: Array<string> = text.split(' ')
    let liveSearches: { [id: number]: number } = {}

    for (let i: number = 0; i < textWords.length;) {
      if (currentNode.children[i].word === textWords[i]) {
        currentNode = currentNode.children[i]
        if (currentNode.level === 0) {
          currentNode.phraseStartId.map(id => {
            liveSearches[id] = id  
          })
        }
        ++i
      } else {
        // current node does not have current word in its children.

        // If there is a phraseEndId, 
        // then the previous sequence of words matched a phrase.
        if (currentNode.phraseEndingsData.length > 0) {
          currentNode.phraseEndingsData.map(id => {
            currentNode.phraseEndingsData.push(id)
          })
        }
      }

      textWords.map((word, i) => {
        if (currentNode.children[i].word === word) {
          currentNode = currentNode.children[i]
          // increment only here...?
        } else {
          // current node does not have current word in its children.

          // If there is a phraseEndId, 
          // then the previous sequence of words matched a phrase.
          if (currentNode.phraseEndingsData.length > 0) {
            currentNode.phraseEndingsData.map(phrase => {
              foundPhrases.push(phrase)
            })
          }
        }
      })
    }

    return foundPhrases
  }
}