import jsonData from '../dictionary-data/dictionary.json'

class TrieNode {
    constructor() {
        this.children = {}
        this.isWord = false
        this.word = ''
        this.description = ''
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()

        // Adding all the words from the dictionary file
        for (let word in jsonData) {
            let sortedWord = word.split("").sort().join('')
            this.insert(sortedWord, word, jsonData[word])
        }
    }

    // Adds a word to the Trie
    insert(word, unsortedWord, description) {
        let currentNode = this.root
        for (let i = 0; i < word.length; i++) {
            if (!currentNode.children[word[i]]) {
                currentNode.children[word[i]] = new TrieNode()
            }
            currentNode = currentNode.children[word[i]]
        }
        currentNode.isWord = true
        currentNode.word = unsortedWord
        currentNode.description = description
    }

    // Finds an anagram given a string
    getLargestAnagramHelper(letters) {
        let currentNode = this.root
        let currentLargestWord = ''
        let description = ''
        for (let i = 0; i < 9; i++) {
            if (currentNode.isWord) {
                currentLargestWord = currentNode.word
                description = currentNode.description
            }
            if (!currentNode.children[letters[i]]) {
                return [currentLargestWord, description]
            }
            currentNode = currentNode.children[letters[i]]
        }
        return [currentLargestWord, description]
    }

    getLargestAnagram(anagram) {
        let foundAnagrams = {}
        // const str = 'apple'
        const result = allCombinations(anagram.split(''))
        for (let ans of result) {
            const [word, des] = this.getLargestAnagramHelper(ans.sort().join(''))
            if (word.length > 3) foundAnagrams[word] = des
        }
        console.log(foundAnagrams)
        return foundAnagrams
    }

    // Iterates through all possible substring and invokes getLargestAnagramHelper
    // Doesn't work 100%
    // Because this algorithm only checks for only all possible substring it misses some combinations
    getLargestAnagramAllSubstring(anagram) {
        let sortedAnagram = anagram.split('').sort().join('')
        let biggestWord = ''
        let biggestDescription = ''
        let wordSet = new Set()
        for (let i = 9; i > 0; i--) {
            for (let j = 0; j <= 9 - i; j++) {
                let subStr = sortedAnagram.slice(j, i + j)
                let [bWord, bDescription] = this.getLargestAnagramHelper(subStr)
                if (bWord.length > biggestWord.length) {
                    biggestWord = bWord
                    biggestDescription = bDescription
                }
                if (bWord.length >= 5 && bWord != biggestWord) {
                    wordSet.add(bWord)
                }
                // console.log(subStr)
            }
        }
        return [biggestWord, biggestDescription, wordSet]
    }



}

// Backtracking algorithm
function allCombinations(arr) {
    const result = [];
    const n = arr.length;

    function backtrack(start, currentComb) {
        if (currentComb.length <= n) {
            result.push([...currentComb]);
        }

        for (let i = start; i < n; i++) {
            currentComb.push(arr[i]);
            backtrack(i + 1, currentComb);
            currentComb.pop();
        }
    }

    backtrack(0, []);
    return result;
}

export let mTrie = new Trie()
// trie.getLargestAnagram('sheen')

