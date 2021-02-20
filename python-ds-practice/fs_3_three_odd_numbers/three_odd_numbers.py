def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    summed = 0
    three_count = 0
    odds = [num for num in nums if not num % 2 == 0]

    for i in range(len(nums)):
        arr = nums[i:i + 3]
        if len(arr) < 3:
            break
        summ = sum(arr)
        if summ % 2:
            return True

    # for num in odds:
    #     summed += num
    #     for n in odds[num - 1::]:
    #         summed += n
    #         three_count += 1
    #         if summed % 2 is not 0 and three_count is 3:
    #             return True
    #     three_count = 0
    #     summed = 0
    return False

print( three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0]))