def print_upper_words(words, letterFilter):
    """Print every word in a list, capitalized. Only passes words whose first letter is any in letterFilter"""
    
    for word in words:
        for letter in letterFilter:
            if (word.startswith(letter)):
                print(str.capitalize(word)) if (word) else None

    return ''




print(print_upper_words(["hey","you"], {'l', 'y'}))