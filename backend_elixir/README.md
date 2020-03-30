# Polychat Backend (Elixir)

The Phoenix app in this directory is a replacement for Polychat's original
backend. The aim is to build a backend server that is functionally equivalent
to the Node.js version, but highly concurrent and with improved fault
tolerance.

## Before You Start

Make sure you have a working installation of `Elixir` (including `mix`) and
`Node.js` (including `npm`). After that, globally install the `Phoenix` archive:

    mix archive.install hex phx_new 1.4.15

Then install the dependencies:

    mix deps.get
    cd assets && npm install

Compile the project:

    mix compile

Start a `Postgres` database instance on port 5432:

    sudo docker pull postgres:12.2
    mix docker.postgres

Run the tests:

    mix test

## Start the Server

To start the `Phoenix` app on `localhost:4000`:

    mix phx.server

To start the app inside `IEx`:

    iex -S mix phx.server

## Custom `mix` Commands

Run the linter:

    mix lint

Start a `Postgres` database instance on port 5432:

    mix docker.postgres

## Useful Links

- Credo Style Guide: https://github.com/rrrene/elixir-style-guide