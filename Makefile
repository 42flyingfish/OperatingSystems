# compiler to use
CC = gcc
# enable warnings flag for gcc
CFLAGS = -Wall -g
# recompile if header file changes

DEPS = ls.h cd.h pwd.h rmdir.h mkdir.h
OBJ = cppshell.o ls.o cd.o pwd.o rmdir.o mkdir.o


%.o: %.c $(DEPS)
	$(CC) $(CFLAGS) -c -o $@ $<

cppshell.out: $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

.PHONY: force
force:
	./cppshell.out
