CC      := gcc
CFLAGS  := -O -Wall
LDFLAGS  := -O 



all: cppshell

cppshell:  cppshell.o ls.o
	$(CC) -o $@ $^ $(LDFLAGS)

run: 
	./cppshell

test: 
	./cppshell < testfile

clean:
	rm cppshell



.c.o:
	$(CC)  $(CFLAGS) -c $<

.PHONY: all
