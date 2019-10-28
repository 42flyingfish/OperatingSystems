#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdlib.h>
#include "cd.h"
#include "ls.h"


#define MAX_TOKEN_LENGTH 50
#define MAX_TOKEN_COUNT 100
#define MAX_LINE_LENGTH 512
#define SHELL_PROMPT "CPPShell: "

void loop();
void runcommand(char* command, char** args);

int main(int argc, char** argv) // args when calling shell, might not use at all -CE
{    
    loop();
    return 0;
}

void loop()
{
    char line[MAX_LINE_LENGTH];
    printf("%s",SHELL_PROMPT); 
    cd(""); 
    
    while(fgets(line, MAX_LINE_LENGTH, stdin)) {
    	// Build the command and arguments, using execv conventions.
    	line[strlen(line)-1] = '\0'; // get rid of the new line
    	char* command = NULL;
    	char* arguments[MAX_TOKEN_COUNT];
    	int argument_count = 0;
    	char* token = strtok(line, " ");
    	while(token)
        {
      		if(!command) 
                command = token;
      		arguments[argument_count] = token;
	      	argument_count++;
      		token = strtok(NULL, " ");
    	}
    	arguments[argument_count] = NULL;
        if(argument_count>0)
        {
            if (strcmp(arguments[0], "exit") == 0)
                exit(0);

            else if (strcmp(command, "ls") == 0) {
	            ls(arguments[1]);
            }
            else if (strcmp(command, "cd") == 0) {
	            cd(arguments[1]);
            } else {
                runcommand(command, arguments);
	    }
        }
        printf("%s",SHELL_PROMPT);
        cd(""); 
    }
}

void runcommand(char* command, char** args)
{
  pid_t pid = fork();
  if(pid)
  { // parent
	  waitpid(pid, NULL, 0);
  }
  else
  { // child
	  execvp(command, args);
  }
}
