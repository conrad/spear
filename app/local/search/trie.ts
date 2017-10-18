
class TrieNode {
  phraseStartId?: number;
  phraseEndId?: number;
  children: { [index:string] : TrieNode } = {};

  constructor(phraseStartId?: number, phraseEndId?: number) {
    if (phraseStartId) {
      this.phraseStartId = phraseStartId;
    }

    if (phraseEndId) {
      this.phraseEndId = phraseEndId;
    }
  }
}

export default class SearchesTrie {
  root: TrieNode; 

  constructor() {
    this.root = new TrieNode();
  }

  addPhrase(root: TrieNode, phrase: string, phraseId: number) {
    let currentNode: TrieNode = root;
    const words: Array<string> = phrase.split(' ');

    words.map((word, i) => {
      if (!currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word] = new TrieNode()
      }

      currentNode = currentNode.children[word];
      
      if (i === words.length - 1) {
        currentNode.phraseEndId = phraseId;
      }
    });
  }

  findPhrase(root: TrieNode, text: string) {
    let currentNode: TrieNode = root;
    let foundPhrases: Array<number> = [];
    let textWords: Array<string> = text.split(' ');
    
    textWords.map((word, i) => {
      if (currentNode.children.hasOwnProperty(word)) {
        currentNode = currentNode.children[word];
        // increment only here...?
      } else {
        // current node does not have current word in its children.

        // If there is a phrase Id, 
        // then the previous sequence of words matched a phrase.
        if (currentNode.phraseId) {
          foundPhrases.push(currentNode.phraseId);
        }

      }
    });
  }
}
