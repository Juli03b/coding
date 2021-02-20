def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    same = True
    for num in range(num1):
        if not list(str(num1)).count(str(num)) == list(str(num2)).count(str(num)):
            same = False
    return same

print(same_frequency(321142, 3212215), same_frequency(1212, 2211))