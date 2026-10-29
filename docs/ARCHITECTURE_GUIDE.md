# Portfolio API Architecture Guide

This guide explains what each important file does and how a request moves through the application.

## Request flow

```text
HTTP request
  -> main.ts (application setup)
  -> AppModule (feature registration)
  -> controller (route matching)
  -> service (application logic)
  -> JSON response
```

## Important files

### `src/main.ts`

This is the application entry point. It creates the Nest application, adds the `/api/v1` prefix to every route, enables CORS for the configured frontend origin, and starts the HTTP server.

### `src/app.module.ts`

This is the root module. It does not contain business logic; it imports the feature modules so Nest can discover them.

### Feature modules

The implemented feature folders follow this pattern:

- `*.module.ts` groups the feature classes.
- `*.controller.ts` defines HTTP paths and methods.
- `*.service.ts` contains the feature logic and temporary data.

The current feature folders are:

- `health/`: operational endpoint used to check whether the API is alive.
- `projects/`: the first real portfolio endpoint, currently backed by an in-memory array.
- `profile/`, `experience/`, `skills/`, `education/`, `contact/`: reserved module boundaries for the next small increments. They currently contain only their module boundary and intentionally have no public endpoints yet.

## Why use a controller and service?

The controller is responsible for HTTP concerns such as `GET /projects`. The service is responsible for deciding what project data to return. Separating them keeps route handling small and makes the logic easier to test and replace with Prisma later.

## Why `/api/v1`?

The version prefix makes future API changes safer. If a later version needs a breaking response change, `/api/v2` can be introduced without immediately breaking an older frontend.

## Why temporary data?

The planning document recommends proving the HTTP and NestJS request flow before adding PostgreSQL and Prisma. The `ProjectsService` array is deliberately small so the endpoint can be understood first. It will eventually be replaced by a database repository.

## Endpoints

### `GET /api/v1/health`

Returns a small status object containing the service name and the time of the response.

### `GET /api/v1/projects`

Returns an array of project objects. The current object shape is a temporary contract containing `slug`, `title`, `summary`, `techStack`, and `featured`.

## Planned next steps

1. Add DTO validation and a configuration module.
2. Add the remaining read-only portfolio endpoints one at a time.
3. Add verified portfolio content.
4. Introduce Prisma and PostgreSQL after the API contract is stable.
5. Add contact validation, persistence, rate limiting, and API documentation.

## Beginner vocabulary

- **Module:** a boundary that groups related NestJS code.
- **Controller:** the class that maps HTTP requests to methods.
- **Service:** the class that contains reusable application logic.
- **DTO:** a typed and validated shape for data crossing the API boundary.
- **Dependency injection:** NestJS creates a service and supplies it to a controller instead of the controller constructing it manually.
