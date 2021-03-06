def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
        
        >>> valid_parentheses("())(()")
        False
    """
    #USE STACK
    if parens[0] == '(' and parens[-1] == ')':
        if parens.count('(') == parens.count(')'):
            return True
    return False

