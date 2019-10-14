CC      = gcc
CFLAGS  = -O
LDFLAGS  = -O 


all: cppshell

simple:  cppshell.o
	$(CC) -o $@ $^ $(LDFLAGS)

run: 
	./cppshell

test: 
	./cppshell < testfile

clean:
	rm cppshell


.c.o:
	$(CC)  $(CFLAGS) -c $<

