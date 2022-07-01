.PHONY: start
start:
	deno run --watch --allow-net --allow-read main.ts

.PHONY: format
format:
	deno fmt

.PHONY: test
test:
	deno fmt --check
	deno lint
