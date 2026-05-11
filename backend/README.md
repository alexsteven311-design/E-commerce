# E-commerce Java Backend

This backend provides a simple REST API for the Angular frontend.

## Run

1. Install Maven if not already installed: https://maven.apache.org/install.html
2. Open a terminal in `backend`
3. Run:

```bash
mvn spring-boot:run
```

## API

- `GET http://localhost:8080/api/products`

The Angular frontend is already configured to load products from this endpoint in `src/app/services/admin.service.ts`.
