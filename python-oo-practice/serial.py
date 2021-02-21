"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        self.start = start - 1
        self.current_serial = self.start

    def __repr__(self):
        return f'<SerialGenerator start={self.start} next={self.start + 1}>'

    def generate(self):
        '''increment start value by one and return result'''
        self.current_serial += 1
        return self.current_serial
    
    def reset(self):
        '''reset incremented serial to the start'''
        self.current_serial = self.start


