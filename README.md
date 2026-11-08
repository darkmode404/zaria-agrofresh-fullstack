# H+ Sport API and Client Student Starter

This folder is a clean, self-contained starting point for building a client that
uses the H+ Sport ASP.NET Core API. The dated lesson folders in the project root
are left unchanged.

## What is included

- `api/HPlusSport.API` — the API project copied from the latest lesson snapshot,
  with a CORS policy for the local client.
- `client` — a plain HTML, CSS, and JavaScript client that lists products and
  lets you add and delete them.

The API uses an in-memory database. Its sample products reset when the API
restarts; this is intentional for the starter exercise.

## Prerequisites

- The .NET 6 SDK (the API targets `net6.0`; .NET 6 is out of support, so this
  version is intended for the existing course project, not a production
  deployment).
- A browser and an editor such as Visual Studio Code.
- Python 3 to serve the client locally, or the VS Code Live Server extension.

## Step 1: Run the API

Open a terminal in this `StudentStarter` folder and run:

```powershell
dotnet run --project .\api\HPlusSport.API\HPlusSport.API.csproj --launch-profile HPlusSport.API
```

Keep this terminal open. The student launch profile uses `http://localhost:5233` and keeps local
development on HTTP so you do not need to configure an HTTPS certificate. The
API enforces HTTPS outside Development. Open
[http://localhost:5233/swagger](http://localhost:5233/swagger) to inspect and
try the API.

The client uses the HTTP address so local HTTPS certificate setup is not
required.

## Step 2: Understand the API

The `ProductsController` exposes these routes:

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/{id}` | Get one product |
| `POST` | `/api/products` | Add a product |
| `PUT` | `/api/products/{id}` | Update a product |
| `DELETE` | `/api/products/{id}` | Delete one product |

A product has `id`, `sku`, `name`, `description`, `price`, `isAvailable`, and
`categoryId` fields. The API also supports deleting multiple products through
`POST /api/products/Delete?ids=1&ids=2`.

Try `GET /api/products` in Swagger first. Confirm that the response is an array
of products before connecting a client.

## Step 3: Understand and configure CORS

Browsers restrict requests between different origins. An origin is the
combination of protocol, host, and port. The client served at
`http://localhost:5500` is a different origin from the API at
`http://localhost:5233`, so the API must allow it.

In `api/HPlusSport.API/Program.cs`, the `StudentClient` policy:

1. Allows the two local client origins (`localhost` and `127.0.0.1` on port
   `5500`).
2. Allows request headers and HTTP methods needed by the client.
3. Is applied before the authorization middleware and controller endpoints.

If you serve the client on a different port, add its exact origin to
`WithOrigins`. For example, `http://localhost:5501` is not covered by the
existing policy. Do not use `AllowAnyOrigin` as a shortcut for a deployed
application; allow only the origins you intend to trust.

## Step 4: Run the client

Open a second terminal in the `StudentStarter` folder and serve the client:

```powershell
py -m http.server 5500 --directory .\client
```

Then open [http://localhost:5500](http://localhost:5500). Alternatively, open
the `client` folder in VS Code and start Live Server on port `5500`.

The client is configured to call `http://localhost:5233/api/products`. If your
API is running on a different port, update `API_BASE_URL` near the top of
`client/app.js`.

## Step 5: Follow the client request

Read `client/app.js` and trace this sequence:

1. `loadProducts()` sends a `GET` request with `fetch`.
2. The browser sends the request to the API.
3. ASP.NET Core checks the CORS policy and routes it to `ProductsController`.
4. The controller returns JSON.
5. The client turns each product into DOM elements and displays it.

The form sends `POST` JSON to create a product. Each product's Delete button
sends a `DELETE` request. The page displays API errors instead of silently
ignoring them.

## Step 6: Build your own version

Use the working client as a starting point, then try these exercises:

1. Change the page title, colors, and product-card layout in `client/index.html`
   and `client/styles.css`.
2. Add a search box that filters the products already loaded in the browser.
3. Add a category filter. Categories currently have IDs 1–5; there is not yet a
   categories API route.
4. Add an edit form that sends a `PUT` request to `/api/products/{id}`.
5. Add input validation and display useful messages for invalid values.
6. Add a `CategoriesController` and then load the category options from the API
   instead of hard-coding them in the client.
7. Replace the in-memory database with a persistent database when you are ready
   to learn migrations and connection strings.

## Troubleshooting

- **CORS error in the browser:** check that the client origin exactly matches an
  entry in `WithOrigins`, including protocol and port. Restart the API after
  changing its CORS configuration.
- **Network error:** check that the API terminal is still running and that
  `API_BASE_URL` uses its current HTTP port.
- **Swagger does not open:** try `http://localhost:5233/swagger` while the API
  is running in its Development launch profile.
- **Products disappear after restart:** this starter uses an in-memory
  database. Data is not persisted.
