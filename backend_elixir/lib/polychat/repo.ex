defmodule Polychat.Repo do
  use Ecto.Repo,
    otp_app: :polychat,
    adapter: Ecto.Adapters.Postgres
end
