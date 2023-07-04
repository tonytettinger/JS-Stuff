import { useEffect, useState } from "react";

const PeriodicTableSpeller = () => {
  const [searchWord, setSearchWord] = useState('')
  const [word, setWord] = useState('')
  useEffect(() => {}, []);

  const symbols = {};

  const periodicTable = require("./assets/periodic.json");

  const indexSymbols = (periodicTable) => {
    for (let element of periodicTable) {
      symbols[element.symbol.toLowerCase()] = element;
    }
  };

  //creating hashmap of the peridioc table element symbols
  indexSymbols(periodicTable);
  const lookupInTable = (inputString) => symbols[inputString] !== undefined;

  //check the candidate elements in a given word
  const candidateFinder = (word) => {
    const oneLetterCandidates = [];
    const twoLetterCandidates = [];
    for (let i = 0; i < word.length - 1; i++) {
      if (lookupInTable(word[i])) {
        oneLetterCandidates.push(word[i]);
      }
      if (i <= word.length - 2) {
        const currentTwoLetters = word.slice(i, i + 2);
        if (lookupInTable(currentTwoLetters)) {
          twoLetterCandidates.push(currentTwoLetters);
        }
      }
    }
    return [
      [...new Set(twoLetterCandidates)],
      [...new Set(oneLetterCandidates)],
    ];
  };

  //function can we spell a word with periodic table elements
  const spellChecker = (
    leftChars,
    twoLetterCandidates,
    oneLetterCandidates
  ) => {
    //check for two letter matches
    console.log("calling spellchecker");
    if (twoLetterCandidates.indexOf(leftChars.slice(0, 2)) !== -1) {
      const matchedChars = [
        leftChars.slice(0, 2),
        ...spellChecker(
          leftChars.slice(2),
          twoLetterCandidates,
          oneLetterCandidates
        ),
      ];
      if (matchedChars.join("") == leftChars) return matchedChars;
    }

    if (oneLetterCandidates.indexOf(leftChars[0]) !== -1) {
      const matchedChars = [
        leftChars[0],
        ...spellChecker(
          leftChars.slice(1),
          twoLetterCandidates,
          oneLetterCandidates
        ),
      ];
      if (matchedChars.join("") == leftChars) return matchedChars;
    }
    //return base case
    return [];
  };

  const findElements = (searchWord) => {
    const [twoLetterCandidates, oneLetterCandidates] =
      candidateFinder(searchWord);
    return spellChecker(searchWord, twoLetterCandidates, oneLetterCandidates);
  };

  const onSubmitHandler = () => {
    const foundWord = findElements(searchWord);
    foundWord && setWord(foundWord);
  }

  return (
    <div className="m-1">
      <div className="mt-6 ml-1 text-xl mb-1">Enter search word to see if it can be spelled with periodic table elements:</div>
      <input onInput={(e)=>setSearchWord(e.target.value)} className="border-solid border-2 border-sky-500 p-1 ml-1"/>
      <button onClick={onSubmitHandler} className="border-solid border-2 ml-3 mb-3 p-1">Submit</button>
      <div id="word-spelling" className="flex ml-1">
        {word &&
          word.map((letter, index) => {
            return (
              <div
                key={index}
                className="element relative flex flex-col justify-center items-center w-32 h-32 border border-black mr-2 flex-shrink-0"
              >
                <div className="number absolute top-1 right-1 text-lg">
                  {symbols[letter].number}
                </div>
                <div className="symbol text-3xl">{symbols[letter].symbol}</div>
                <div className="name text-sm absolute bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  {symbols[letter].name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { PeriodicTableSpeller };
