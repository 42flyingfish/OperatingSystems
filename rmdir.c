#include <dirent.h> // for DIR, opendir, readdir, and closedir
#include "rmdir.h"
#include <stdio.h>
#include <stdlib.h>


void cpprmdir(char *args) {
	//TODO Enable options
	DIR *dir;
	char *path;

	// *args is used for a path
	// if *args is Null throw error msg
	if (args) {
		path = args;
		// We attempt to open the mentioned in path
		// If path happens to an invalid option, print and error message and return
		dir = opendir(path);
		if(dir) {
			closedir(dir);
		} else {
			perror("Error!");
			return;
		}
		//Attempt remove of dir and return status, 0 means successful rem
		int rem = remove(path);
		//Show error if could not remove dir
		if(rem != 0)
			perror("Error!");
	} else {
		printf("rmdir: missing operand!\n");
	}
}