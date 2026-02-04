# Backend API Documentation

All endpoints are served under the `/api` prefix.

- **Base URL (local)**: `http://localhost:<PORT>/api`
- **Default port**: `5000`
- **Uploads base**: `http://localhost:<PORT>/uploads`

> Note: Several routes are labeled “admin” in code, but **authentication is not yet implemented** for them.

## Conventions

### Success responses

Most endpoints return:

```json
{
  "success": true,
  "data": {}
}
```

Some endpoints return a top-level `message` instead of (or in addition to) `data`.

### Error responses

Errors (including validation, rate-limits, and 404s) return:

```json
{
  "success": false,
  "error": {
    "message": "Human readable message"
  }
}
```

In development (`NODE_ENV=development`), a `stack` may also be included.

### Rate limiting

- **All `/api/*`**: 100 requests / 15 minutes / IP
- **Form submissions** (`contact`, `events/:id/register`, `resources/:id/download`): 10 requests / hour / IP
- **Job applications** (`applications`): 5 requests / day / IP

## Health

### `GET /health`

Returns a simple health status.

## Contact

### `POST /contact`

Submit the contact form.

- **Rate limit**: form limiter (10/hour/IP)
- **Body (JSON)**:
  - **name**: string, min 2 chars
  - **email**: valid email
  - **company**: string (optional)
  - **subject**: string, min 5 chars
  - **message**: string, min 10 chars

Example:

```bash
curl -X POST "http://localhost:5000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Ada Lovelace",
    "email":"ada@example.com",
    "company":"Analytical Engines Inc.",
    "subject":"Partnership inquiry",
    "message":"Hello! We would like to learn more about your platform."
  }'
```

### `GET /contact` (admin)

List contact submissions.

- **Query params**:
  - **status**: `new` | `read` | `replied`
  - **page**: number (default `1`)
  - **limit**: number (default `10`)

### `PATCH /contact/:id/status` (admin)

Update a contact submission status.

- **Body (JSON)**:
  - **status**: `new` | `read` | `replied`

## Jobs

### `GET /jobs`

List active job postings.

- **Query params** (all optional):
  - **department**: string
  - **location**: string
  - **type**: string (expects values like `Full-time`, `Part-time`, `Contract`)
  - **search**: string (searches `title` and `description`)

### `GET /jobs/:slug`

Fetch a single active job posting by slug.

### `POST /jobs` (admin)

Create a job posting.

- **Body (JSON)**:
  - **title**: string (min 5)
  - **slug**: string (min 3)
  - **department**: string (min 2)
  - **location**: string (min 2)
  - **type**: `Full-time` | `Part-time` | `Contract`
  - **description**: string (min 50)
  - **requirements**: string[] (min 1)
  - **responsibilities**: string[] (min 1)
  - **salary** (optional): `{ "min": number, "max": number, "currency": string }`
  - **isActive** (optional): boolean

### `PUT /jobs/:id` (admin)

Update a job posting.

Accepts a **partial** body of the `POST /jobs` schema.

### `DELETE /jobs/:id` (admin)

Delete a job posting.

## Applications

### `POST /applications`

Submit a job application.

- **Rate limit**: application limiter (5/day/IP)
- **Content-Type**: `multipart/form-data`
- **File upload**:
  - **field name**: `resume`
  - **allowed types**: PDF, DOC, DOCX
  - **max size**: `MAX_FILE_SIZE` (default 5MB)
- **Form fields**:
  - **jobId**: string (required)
  - **name**: string (required)
  - **email**: string (required)
  - **phone**: string (required)
  - **coverLetter**: string (optional)
  - **linkedIn**: url string (optional)

Example:

```bash
curl -X POST "http://localhost:5000/api/applications" \
  -F "jobId=YOUR_JOB_ID" \
  -F "name=Ada Lovelace" \
  -F "email=ada@example.com" \
  -F "phone=+15551234567" \
  -F "linkedIn=https://www.linkedin.com/in/ada-lovelace/" \
  -F "coverLetter=Excited to apply." \
  -F "resume=@/path/to/resume.pdf"
```

On success, returns `201` with an application id. The uploaded resume is saved under `/uploads/resumes/*` and the application stores a `resumeUrl` like `/uploads/resumes/<filename>`.

### `GET /applications` (admin)

List applications.

- **Query params**:
  - **jobId**: string (optional)
  - **status**: string (optional)
  - **page**: number (default `1`)
  - **limit**: number (default `10`)

### `GET /applications/:id` (admin)

Fetch an application by id.

### `PATCH /applications/:id/status` (admin)

Update an application’s status.

- **Body (JSON)**:
  - **status**: `new` | `reviewing` | `interview` | `offer` | `rejected`

## Blog

### `GET /blog`

List published blog posts.

- **Query params**:
  - **category**: string (optional)
  - **tag**: string (optional)
  - **search**: string (optional)
  - **page**: number (default `1`)
  - **limit**: number (default `10`)

### `GET /blog/:slug`

Fetch a published blog post by slug.

Also returns up to 3 related posts and increments the post’s `viewCount`.

### `GET /blog/admin/all` (admin)

List all posts including drafts.

- **Query params**:
  - **page**: number (default `1`)
  - **limit**: number (default `10`)

### `POST /blog` (admin)

Create a blog post.

- **Body (JSON)**:
  - **title**: string (min 5)
  - **slug**: string (min 3)
  - **excerpt**: string (min 20)
  - **content**: string (min 100)
  - **category**: string (min 2)
  - **tags**: string[] (optional)
  - **coverImage**: url string (optional)
  - **isPublished**: boolean (optional)

### `PUT /blog/:id` (admin)

Update a blog post.

Accepts a **partial** body of the `POST /blog` schema.

### `DELETE /blog/:id` (admin)

Delete a blog post.

## Events

### `GET /events`

List active events.

- **Query params**:
  - **type**: `webinar` | `workshop` | `conference` (optional)
  - **upcoming**: `true` | `false` (optional)

### `GET /events/:slug`

Fetch an active event by slug.

### `POST /events/:id/register`

Register a user for an event.

- **Rate limit**: form limiter (10/hour/IP)
- **Body (JSON)**:
  - **name**: string (min 2)
  - **email**: valid email
  - **company**: string (optional)

Returns `201` on success and sends a confirmation email.

### `POST /events` (admin)

Create an event.

- **Body (JSON)**:
  - **title**: string (min 5)
  - **slug**: string (min 3)
  - **description**: string (min 20)
  - **type**: `webinar` | `workshop` | `conference`
  - **date**: string or date
  - **time**: string
  - **duration**: string
  - **speakers** (optional): array of `{ name: string, role: string, avatar?: string }`
  - **maxAttendees** (optional): number
  - **isActive** (optional): boolean

### `PUT /events/:id` (admin)

Update an event.

Accepts a **partial** body of the `POST /events` schema.

### `DELETE /events/:id` (admin)

Delete an event and its registrations.

### `GET /events/:id/registrations` (admin)

List registrations for an event.

## Resources

### `GET /resources`

List resources.

- **Query params**:
  - **type**: `whitepaper` | `ebook` | `template` | `guide` (optional)

### `GET /resources/:slug`

Fetch a resource by slug.

### `POST /resources/:id/download`

Request a download link (gated resources) or get a direct download URL (ungated).

- **Rate limit**: form limiter (10/hour/IP)
- **Body (JSON)** (all optional due to schema being partial):
  - **email**: valid email
  - **name**: string (min 2)

Behavior:

- If `resource.isGated === true`: **email is required** and a download link is emailed; response includes `downloadUrl: undefined`.
- If `resource.isGated === false`: response includes `downloadUrl` with the resource’s `fileUrl`.

### `POST /resources` (admin)

Create a resource.

- **Body (JSON)**:
  - **title**: string (min 5)
  - **slug**: string (min 3)
  - **description**: string (min 20)
  - **type**: `whitepaper` | `ebook` | `template` | `guide`
  - **fileUrl**: url string
  - **thumbnailUrl**: url string (optional)
  - **isGated**: boolean (optional, default `false`)

### `PUT /resources/:id` (admin)

Update a resource.

Accepts a **partial** body of the `POST /resources` schema.

### `DELETE /resources/:id` (admin)

Delete a resource.

### `GET /resources/:id/stats` (admin)

Get download statistics for a resource.

## Environment variables (backend)

See `.env.example` for the full list. Common variables:

- **PORT**: server port (default `5000`)
- **NODE_ENV**: `development` | `production`
- **MONGODB_URI**: MongoDB connection string
- **FRONTEND_URL**: allowed CORS origin(s). Supports **comma-separated** values (e.g. `http://localhost:5173,http://localhost:8080`)
- **SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / EMAIL_FROM**: email sending configuration
- **MAX_FILE_SIZE**: upload limit in bytes (default `5242880`)
- **UPLOAD_DIR**: upload directory (default `uploads`)

