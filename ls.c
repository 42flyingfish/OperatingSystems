#include <dirent.h> // for DIR, opendir, readdir, and closedir
#include "ls.h"
#include <stdio.h>


void ls(char *args) {
	//TODO Enable options
	DIR *dir;
	struct dirent *file;
	char *path; 

	if (args) {
		path = args;
	}else {
		path = ".";
	}

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

}
