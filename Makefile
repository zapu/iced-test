
ICED=node_modules/.bin/iced

index.js: index.iced
	$(ICED) -m -c $<

default: setup index.js

setup:
	npm install -d

.PHONY: setup
