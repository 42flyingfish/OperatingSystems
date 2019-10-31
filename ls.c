#include <dirent.h> // for DIR, opendir, readdir, and closedir
#include "ls.h"
#include <stdio.h>


void ls(char *args) {
	//TODO Enable options
	DIR *dir;
	struct dirent *file;
	char *path; 

	// *args is used for a path
	// if *args is Null we instead assume that the path is the pwd
	if (args) {
		path = args;
	}else {
		path = ".";
	}

	// We attempt to open the mentioned in path
	// If path happens to an invalid option, print and error message and return
	// Otherwise transverse through the directory and print the file names (d_name)
	// Files are currently printed with no ordering in mind.
	dir = opendir(path);
	if(!dir) {
		perror("opendir() failed");
		return;
	}
	while ((file = readdir(dir)) != NULL) {
		if(file->d_type == 4){	//4 is for dir, 8 is for file
			printf("\033[1;34m");	//highlight dir as bold blue
		}
		printf("%s\t", file->d_name);
		printf("\033[0m");	//clear text color to normal
	}
	printf("\n");
	closedir(dir);

}
