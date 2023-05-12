VENV = venv
BIN=$(VENV)/bin

# venv環境作成
.PHONY: init
init:
	@python3 -m venv $(VENV)

# venv下でpip install
.PHONY: install
install: requirements.txt
	$(BIN)/pip install --upgrade -r requirements.txt

# パッケージのインストールとfreeze
.PHONY: add-%
add-%:
	$(BIN)/pip install ${@:add-%=%}
	$(BIN)/pip freeze > requirements.txt

# venv下でlocalhost立ち上げ
.PHONY: start
start:
	$(BIN)/python3 app/main.py

# dockerコンテナ立ち上げ
.PHONY: up
up:
	@docker compose up --build

