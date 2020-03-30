defmodule PolychatWeb.PageController do
  use PolychatWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
