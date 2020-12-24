May have to allow script to run as executable,
if so run the following command.

chmod u+x testscript

script will then run the make file and prepare things to testscript.
script uses only bash as to not rely on installing "expect".
because of this the output prompt may be missing some newlines and will look strange.
script uses stdin redirection to emulate user input put this is not shown on terminal.