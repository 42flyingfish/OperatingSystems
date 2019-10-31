#include "mkdir.h"
#include <stdio.h>
#include <sys/stat.h>
#define mode 0755


void _mkdir(char *path) {
	if (mkdir(path, mode) != 0) {
		perror("mkdir failed");
	}
}
