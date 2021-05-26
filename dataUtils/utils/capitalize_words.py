def capitalize_words(string):
    n = len(string)
    i = 0
    while i < n:
        if not string[i].isalpha():
            pass
        elif i == 0:
            # first char char is alphabetical
            string = string[:i] + string[i:].capitalize()
        elif not string[i - 1].isalpha():
            # this char is alphabetical and last char is not
            # start of new word
            string = string[:i] + string[i:].capitalize()
        else:
            pass
        i += 1
    return string
