#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdlib.h>
#include "cd.h"
#include "ls.h"
#include "pwd.h"
#include "rmdir.h"
#include "cp.h"

//global variables to define max parameters for args and input line
#define MAX_ARG_COUNT 100
#define MAX_LINE_LENGTH 512
//prompt header, TODO: replace with current system user
#define SHELL_PROMPT "CPPShell: "

void loop();
void printPrompt();
void runcommand(char *command, char **args);

//main is basically a loop
int main(int argc, char** argv) // args when calling shell, might not use at all -CE
{    
    loop();
    return 0;
}

//loop the shell until exit is called
void loop()
{
    char line[MAX_LINE_LENGTH];
    printPrompt();
    
    // get user input and parse tokens (keywords)
    while(fgets(line, MAX_LINE_LENGTH, stdin)) {
    	// Build the command and arguments, using execv conventions.
    	line[strlen(line)-1] = '\0'; // get rid of the new line
    	char *command = NULL;   //initialize command var
    	char *arguments[MAX_ARG_COUNT];
    	int argument_count = 0;
        //split line by spaces to get tokens(keywords)
        //points token var to line and gets first token
    	char *token = strtok(line, " ");
    	while(token)
        {
            //first token is the command name, will only happen on first pass
      		if(!command)
                command = token;
      		arguments[argument_count] = token;
	      	argument_count++;
            //get next token
      		token = strtok(NULL, " ");
    	}
        //initialize args array up to arg count
    	arguments[argument_count] = NULL;
        //select command if any are passed in
        if(argument_count > 0)
        {
            if (strcmp(arguments[0], "exit") == 0){
                exit(0);
            }
            else if (strcmp(command, "ls") == 0) {
	            ls(arguments[1]);
            }
            else if (strcmp(command, "cd") == 0) {
	            cd(arguments[1]);
            }
            else if (strcmp(command, "pwd") == 0) {
	            pwd();
            } 
            else if (strcmp(command, "rmdir") == 0) {
	            cpprmdir(arguments[1]);
            } 
            else if (strcmp(command, "mkdir") == 0) {
	            _mkdir(arguments[1]);
            } 
            else if (strcmp(command, "cp") == 0) {
	            cp(arguments[1], arguments[2]);
            } else {
                runcommand(command, arguments);
	        }
        }
        printPrompt();
    }
}

void printPrompt()
{
    // magenta bold color prompt
    printf("\033[1;35m");
    printf("%s",SHELL_PROMPT);
    // print directory inline
    cd(""); 
}

void runcommand(char* command, char** args)
{
    // run executable in its own process using fork
    pid_t pid = fork();
    // fork will split to 2 instances then handled by the if, shell goes to true, command goes to else
    if(pid)
    {   // make shell wait for child process
        waitpid(pid, NULL, 0);
    }
    else
    {   // system call to run executable (child process)
        execvp(command, args);
    }
}