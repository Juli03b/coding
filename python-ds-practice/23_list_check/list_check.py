def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    for itm in lst:
        if not isinstance(itm, list):
            return False
    return True
    