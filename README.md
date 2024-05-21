---------------------------------------------
## EDI X12 of 835 ERA RESPONSE TO JSON CONVERTER
---------------------------------------------

# 1. Introduction
    The project is to convert X12 format of ERA (835) Response to a JSON.

# 2. Parser
*    ***_835_parser and _835_parser_from_file*** are methods that can be used to parse X12 into JSON.
*    ***_835_parser_from_file*** takes file or a folder path as input where ***txt*** or ***835*** format files are read, and transformed into a readable JSON.
*    ***_835_parser*** takes x12 string or array of string as input and transformed into a readable JSON.
*    It is capable of handling loops of X12 and all segments of it.