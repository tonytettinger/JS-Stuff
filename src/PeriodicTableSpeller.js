import { useEffect } from "react";

const PeriodicTableSpeller = () => {
  useEffect(()=>{

  },[])

const symbols = {}

const periodicTable = require('./assets/periodic.json')

const indexSymbols =  (periodicTable) => {
  for(let element of periodicTable) {
    symbols[element.symbol.toLowerCase()] = element
  }
}

//creating hashmap of the peridioc table element symbols
indexSymbols(periodicTable)
const lookupInTable = (inputString) => symbols[inputString] !== undefined

//check the candidate elements in a given word

const candidateFinder = (word) => {
  const oneLetterCandidates = []
  const twoLetterCandidates = []
  for(let i = 0; i < word.length-1; i++) {
    if(lookupInTable(word[i])) {
      oneLetterCandidates.push(word[i])
    }
    if(i<=word.length-2) {
      const currentTwoLetters = word.slice(i,i+2)
      if(currentTwoLetters in symbols) {
        twoLetterCandidates.push(word[i]+word[i+1])
      }
    }
  }
  return [[...new Set(twoLetterCandidates)], [...new Set(oneLetterCandidates)]]
}

const [twoLetterCandidates, oneLetterCandidates] = candidateFinder('pareoxe')

//function can we spell a word with periodic table elements

const spellChecker = (leftChars) => {
  //check for two letter matches

  if(twoLetterCandidates.indexOf(leftChars.slice(0,2)) !== -1) {
    console.log('slice', leftChars.slice(0,2))
    const matchedChars = [leftChars.slice(0,2), ...spellChecker(leftChars.slice(2))]
    console.log('matchedCharsString', matchedChars.join(""), 'leftCharsSlice', leftChars.slice(2))
    if(matchedChars.join("") == leftChars) return matchedChars
  }

  if(oneLetterCandidates.indexOf(leftChars[0]) !== -1) {
    const matchedChars = [leftChars[0], ...spellChecker(leftChars.slice(1))]
    if(matchedChars.join("") == leftChars) return matchedChars
  }
  //return base case
  return []
}

  return <div className="text-3xl font-bold underline">
    Check spelling with periodic table elements
  </div>;
};

export { PeriodicTableSpeller };
