def number_compare(a, b):
    """Report on whether a>b, b>a, or b==a
    
        >>> number_compare(1, 1)
        'Numbers are equal'
        
        >>> number_compare(-1, 1)
        'Second is greater'
        
        >>> number_compare(1, -2)
        'First is greater'
    """
    if a > b or b > a:
        return 'First is greater' if (a > b) else 'Second is greater'
    elif a == b:
        return 'Numbers are equal'

print(number_compare(16, 7))