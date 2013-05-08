
ICED=node_modules/.bin/iced

index.js: index.iced
	$(ICED) -m -c $<

default: setup index.js

pubclean:
	rm -rf node_modules

setup:
	npm install -d

.PHONY: setup pubclean
