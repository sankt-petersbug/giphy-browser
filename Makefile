.PHONY: install
install:
	yarn install

.PHONY: test
test: install
	yarn test

.PHONY: dev-server
dev-server: install
	yarn start

.PHONY: build
build: install
	yarn build
