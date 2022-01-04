IMG_DIR  = img
IMGW_DIR = imgw
GALLARY  = gallary
IMG_LIST = filelist.txt
SCRIPT   = builder.c
EXCU     = a.out
CC       = gcc

.PHONY: all build clean commit imgs

all: clean imgs build

build:
# build index.html
	$(CC) $(SCRIPT) -o $(EXCU)
	./$(EXCU)
	rm -f $(EXCU)
# build imgw
	$(CC) $(IMGW_DIR)/$(SCRIPT) -o $(IMGW_DIR)/$(EXCU)
	$(IMGW_DIR)/$(EXCU)
	rm -f $(IMGW_DIR)/$(EXCU)

clean:
	rm -f $(IMGW_DIR)/*.html
	rm -f index.html

commit:
	git add .
	git commit -m "update"

imgs:
	ls $(IMG_DIR)/$(GALLARY) | grep .jpg | awk '{print i$$0}' i='$(IMG_DIR)/$(GALLARY)/' > $(IMG_DIR)/$(IMG_LIST)