
class TrieNode {
  word: string
  level: number
  phraseStartId: Array<number>
  phraseEndId: Array<number>
  children: { [word:string] : TrieNode } = {}  //  Array<TrieNode> = [] 

  constructor(
    word: string, 
    level: number, 
    phraseStartId: Array<number>  = [],
    phraseEndId: Array<number> = [],
  ) {
    this.word = word
    this.level = level
    this.phraseStartId = phraseStartId
    this.phraseEndId = phraseEndId
  }
}

export default class SearchesTrie {
  root: TrieNode

  constructor() {
    this.root = new TrieNode(' ', 0)
  }

  addPhrase(parent: TrieNode, phrase: string, phraseId: number) {
    const words: Array<string> = phrase.split(' ')
    let hasChild: boolean = false
    let nextNode: TrieNode = new TrieNode(' ', 0)

    // parent.children.map(child => {
    // words.map(word => {
    //   if (parent.children.hasOwnProperty(word)) {
    //     hasChild = true
    //     nextNode = parent.children[word]
    //   }
    // })

    if (parent.children.hasOwnProperty(words[0])) {
      hasChild = true
      nextNode = parent.children[words[0]]
    }

    if (!hasChild) {
      nextNode = new TrieNode(words[0], parent.level + 1)
      parent.children[nextNode.word] = nextNode
    }

    words.shift()
    
    if (words.length > 0) {
      this.addPhrase(nextNode, words.join(' '), phraseId)
    } else {
      nextNode.phraseEndId.push(phraseId)
    }
  }

  findString(root: TrieNode, text: string, foundPhraseIds: Array<number> = []) {
    let currentNode: TrieNode = root
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
        if (currentNode.phraseEndId.length > 0) {
          currentNode.phraseEndId.map(id => {
            currentNode.phraseEndId.push(id)
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
        if (currentNode.phraseEndId.length > 0) {
          // foundPhraseIds.push(currentNode.phraseEndId)
          currentNode.phraseEndId.map(id => {
            currentNode.phraseEndId.push(id)
          })
        }
      }
    })
  }
}
}