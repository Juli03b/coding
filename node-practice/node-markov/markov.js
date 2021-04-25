/** Textual markov chain generator */

const randomArrItem = (arr) => {
  if(arr){
    const randIdx = Math.floor(Math.random() * arr.length);

    return arr[randIdx];
  }else{
    return false;
  }
}

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};

    this.words.forEach((word, idx, words) => {
       
      if(chains[word]){

        if(words[idx + 1]){
          chains[word].push(words[idx + 1]);
        }else{
          chains[word].push(null);
        }

      }else{

        if(words[idx + 1]){
          chains[word] = [words[idx + 1]];
        }else{
          chains[word] = [null];
        }

      }
    });

    return chains;
  }

  makeText(numWords = 100) {
    let text = [];
    let chain = this.makeChains(this.words.slice(numWords));
    let currentWord = randomArrItem(Object.keys(chain));

    while(chain){
      const nextWord = randomArrItem(chain[currentWord]);

      text.push(currentWord);
      text.push(nextWord);  
      currentWord = randomArrItem(chain[nextWord]);
      
      if (!nextWord){
        break;
      }
    }

    text = text.filter(word => word);

    return text.join(' ')
  }
}

module.exports = MarkovMachine