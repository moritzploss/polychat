defmodule Mix.Tasks.Docker.Postgres do
  use Mix.Task

  @shortdoc "Start a Postgres database on port 5432"

  def run(_) do
    Mix.shell().cmd(
      "docker run \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=polychat_dev \
        -p 5432:5432 \
        -d postgres"
    )
  end
end
