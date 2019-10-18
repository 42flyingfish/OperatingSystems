#include <dirent.h> // for DIR, opendir, readdir, and closedir
#include "ls.h"
#include <stdio.h>


void ls(char **args) {
	//TODO Error handling of nonexistant paths
	//TODO Enable options
	DIR *dir;
	struct dirent *file;
	char *path; 

	if (args[1]) {
		path = args[1];
	}else {
		path = ".";
	}

	dir = opendir(path);
	while ((file = readdir(dir)) != NULL) {
		if (file->d_name)
			printf("%s ", file->d_name);
	}
	printf("\n");
	closedir(dir);

}
