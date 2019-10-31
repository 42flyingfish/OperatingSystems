#include <unistd.h>
#include <string.h>
#include "cp.h"
#include <stdio.h>

void cp(char *args) {
    char s[100];
    char *path;
    if(args)
    {
        path = args;
    }
    else
    {
        path = ".";
    }
    
    if(strcmp(path, "") != 0)
    {
        // using the command 
        chdir(path);
    }
    else
    {
        // printing current working directory
        printf("\033[1;31m");
        printf("%s", getcwd(s, 100));
        // todo get user level symbol
        printf("\033[0m");
        printf("%s", "$ ");
    }
}