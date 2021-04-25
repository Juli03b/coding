const MarkovMachine = require('./markov')

test('markov object', () => {
    const wordsArr = [ 'the', 'cat', 'in', 'the', 'hat' ]
    const mark
    let markovData = new MarkovMachine("the cat in the hat");
    console.log(markovData.makeChains(), 'CONSOLE')
    expect(markovData).toBeInstanceOf(MarkovMachine);
    expect(markovData.words).toEqual(expect.arrayContaining(wordsArr));
})
