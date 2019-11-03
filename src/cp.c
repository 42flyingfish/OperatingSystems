#include <stdlib.h>
#include <stdio.h>
#include "cp.h"

void cp(char *sourcePath, char *targetPath) {
    char buffer;
    FILE *source, *target;
    //check if both args passed in
    if(sourcePath && targetPath)
    {
        //open file at arg1 and check if empty
        source = fopen(sourcePath, "r");
        if(source ==  NULL)
        {
            printf("Source file is empty!");
            return;
        }
        //open file at arg2 and check if empty
        target = fopen(targetPath, "w");
        if(source ==  NULL)
        {
            printf("Target file is empty!");
            return;
        }
        //copy whole file line by line
        while((buffer = fgetc(source)) != EOF)
            fputc(buffer, target);
        //close file streams
        fclose(source);
        fclose(target);
    }
    else
    {
        printf("cp: Missing an arguement!\n");
    }
}