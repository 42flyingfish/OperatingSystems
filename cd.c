#include <unistd.h>
#include <string.h>
#include "cd.h"
#include <stdio.h>

void cd(char *args) {
    char s[100];
    if(strcmp(args, "") != 0)
    {
        // using the command 
        chdir(args);
    }
    else
    {
        // printing current working directory 
        printf("%s", getcwd(s, 100));
        // todo get user level symbol
        printf("%s", "$ ");
    }

}