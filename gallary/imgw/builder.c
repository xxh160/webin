#include <stdio.h>
#include <string.h>
#include <assert.h>

const char *filelist = "img/filelist.txt";
const char *tmplate =
"<!DOCTYPE html5>"
"<html lang=\"en\">"
"<head>"
"    <meta charset=\"utf-8\">"
"    <title>Hell</title>"
"    <link href=\"../css/common.css\" rel=\"stylesheet\">"
"    <link href=\"../css/form.css\" rel=\"stylesheet\">"
"</head>"
"<style>"
"    .gallary {"
"        width: 80%%;"
"        margin: 5%% auto;"
"        padding: 20px;"
"        border: 0;"
"        border-radius: 10px;"
"        background-color: #00000060;"
"        column-count: 1;"
"    }"
"    .item {"
"        padding: 15px;"
"        margin: 5px;"
"        position: relative;"
"        counter-increment: count;"
"        border-radius: 15px;"
"    }"
"    .item img {"
"        width: 100%%;"
"        height: auto;"
"    }"
"</style>"
"<body>"
"    <header>"
"        <div class=\"title\">Hell</div>"
"        <a class=\"button\" href=\"../index.html\">home</a>"
"        <a class=\"button\" href=\"../register.html\">sign up</a>"
"        <a class=\"button\" href=\"../login.html\">sign in</a>"
"    </header>"
"    <div class=\"gallary\">"
"        <div class=\"item\">"
"            <img src=../%s alt=\"\">"
"        </div>"
"    </div>"
"</body>"
"</html>";

static void cfile(char *img, int c) {
	char cstr[5] = {0};
	sprintf(cstr, "%d", c);
	// html name
	char name[64] = "imgw/imgw";
	strcat(name, cstr);
	strcat(name, ".html");
	name[strlen(name)] = 0;
	// code
	char code[strlen(tmplate) + 64];
	memset(code, 0, strlen(tmplate) + 64);
	sprintf(code, tmplate, img);
	// generate
	FILE *fp = fopen(name, "w");
	assert(fp != NULL);
	fputs(code, fp);
	fclose(fp);
}

int main() {
	FILE *fp = fopen(filelist, "r");
	assert(fp != NULL);

	char tmp[1024];
	int count = 0;
	while(fgets(tmp, 1024, fp) != NULL){
		++count;
		cfile(tmp, count);
		memset(tmp, 0, 1024);	
  }
	fclose(fp);
}