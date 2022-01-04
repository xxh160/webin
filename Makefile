.PHONY: commit push

push:
	@git push origin main

commit:
	@git add .
	@git commit -m "update"