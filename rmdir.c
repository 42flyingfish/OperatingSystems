#include <dirent.h> // for DIR, opendir, readdir, and closedir
#include "rmdir.h"
#include <stdio.h>
#include <stdlib.h>


void cpprmdir(char *args) {
	//TODO Enable options
	DIR *dir;
	struct dirent *file;
	char *path; 

	// *args is used for a path
	// if *args is Null throw error msg
	if (args) {
		path = args;
		dir = opendir(path);
		if(!dir) {
			perror("opendir() failed");
			return;
		}
		while ((file = readdir(dir)) != NULL) {
			if (file->d_name)
				printf("%s ", file->d_name);
		}
	printf("\n");
	closedir(dir);
	} else {
		printf("rmdir: missing operand!\n");
	}
}