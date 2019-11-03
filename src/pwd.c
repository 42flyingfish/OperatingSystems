#include <unistd.h>
#include <string.h>
#include "pwd.h"
#include <stdio.h>

void pwd() {
    char s[100];
    // printing current working directory
    printf("%s\n", getcwd(s, 100));
}