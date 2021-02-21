"""Word Finder: finds random words from a dictionary.

    >>> words.path 
    'words.txt'

    >>> words.random_word() in words.words_list
    True
    
"""

from random import choice

class WordFinder:
    def __init__(self, path):
        self.path = path
        self.words_list = self.words_to_list()
        self.word_count = len(self.words_list)

    def words_to_list(self):
        '''Turns words into a list.'''

        words_list = list()
        with open(self.path, 'r') as file:
            for word in file:
                words_list.append(word.rstrip())
        return words_list

    def random_word(self):
        '''Return a random word from the words list.'''

        return choice(self.words_list)
    
    def __repr__(self):
        return f'<WordFinder path={self.path} word_count={self.word_count}>'

class SpecialWordFinder(WordFinder):
    '''Find words for list that includes empty lines or commented words.'''

    def __init__(self, path):
        super().__init__(path)
        self.words_list = self.words_to_list()
    
    def words_to_list(self):
        '''Return words list, not including words that contain a "#" and not including blank lines.'''

        return [word for word in super().words_to_list() if word and not word.count('#')]

words = WordFinder('words.txt')