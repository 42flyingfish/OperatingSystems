// Line taken from linux man page for ftw
// Strangely, you may not use the function
//     nftw() without the _XOPEN_SOURCE macro
#define _XOPEN_SOURCE 500 


#include <dirent.h> // for DIR, opendir, readdir, and closedir
#include <stdio.h>
#include <stdlib.h>
#include "rmdir.h"
#include <ftw.h> // for nftw

// This is a limit for how far many subfolders we can enter
#define DEPTH 64


// Intended to be used by cpprmdir
// Call back function for ftw. See man page for ftw for explanation and example
static int ftwHandler(const char *path, const struct stat *sb, int tflag, struct FTW *ftwbuf);

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
			perror("Error! (rmdir)");
			return;
		}
		//Attempt remove of dir and return status, 0 means successful rem
		//Show error if could not remove dir
		// ftw will return the same value that is returned by ftwHandler
		int err = nftw(path, ftwHandler, DEPTH, FTW_DEPTH);
		if (err != 0) {
			printf("An error occured: %d\n", err);
		}
	} else {
		printf("rmdir: missing operand!\n");
	}
}


// Call back function for ntw.
// See the manpage for nftw for a detailed explanation of the parameter list.
// Most of the parameters are unused in the callback function itself. 
// Only const char *path is used as it is a path to a file to be deleted by the function
// rem is the status returned from removing a file
// if rem is not zero, which in this case will happen if remove() returns an error, the caller will stop
static int ftwHandler(const char *path, const struct stat *sb, int tflag, struct FTW *ftwbuf) {
	int rem = remove(path);
	if (rem) {
		perror(path);
	} else {
		printf("Deleting %s\n", path);
	}
	return rem;
}
