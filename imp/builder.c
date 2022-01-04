#include <assert.h>
#include <stdio.h>
#include <string.h>

const char *filelist = "img/filelist.txt";
const char *tmplate =
    "<!DOCTYPE html>"
    "<html lang=\"en\">"
    "<head>"
    "    <meta charset=\"utf-8\">"
    "    <title>Login</title>"
    "    <link href=\"css/common.css\" rel=\"stylesheet\">"
    "    <link href=\"css/form.css\" rel=\"stylesheet\">"
    "    <link href=\"css/gallary.css\" rel=\"stylesheet\">"
    "</head>"
    "<body>"
    "    <header>"
    "        <div class=\"title\">Hell</div>"
    "        <a class=\"button\" href=\"register.html\">sign up</a>"
    "        <a class=\"button\" href=\"login.html\">sign in</a>"
    "    </header>"
    "    <div class=\"form\">"
    "        <h1>Wanna konw what the hell looks like?</h1>"
    "        <input type=\"text\" placeholder=\"search for what you want\">"
    "        <a class=\"button\" href=\"index.html\">GO</a>"
    "    </div>"
    "    <div class=\"gallary\">"
    "        %s"
    "    </div>"
    "</body>"
    "</html>";

int main() {
  FILE *fp = fopen(filelist, "r");
  assert(fp != NULL);

  char buf[1024 * 1024] = {0};
  char tcode[1024] = {0};
  char tmp[1024] = "<div class=\"item\">"
                   "  <img src=%s alt="
                   ">"
                   "  <a href=imgw/imgw%d.html>For details</a>"
                   "</div>\n";

  int count = 0;
  char img[1024] = {0};
  while (fgets(img, 1024, fp) != NULL) {
    ++count;
    sprintf(tcode, tmp, img, count);
    strcat(buf, tcode);
    memset(tcode, 0, 1024);
    memset(img, 0, 1024);
  }
  // code
  char code[strlen(tmplate) + strlen(buf) + 1024];
  memset(code, 0, strlen(tmplate) + strlen(buf) + 1024);
  sprintf(code, tmplate, buf);
  // generate
  FILE *fpp = fopen("index.html", "w");
  assert(fpp != NULL);
  fputs(code, fpp);
  fclose(fpp);

  fclose(fp);
}