# React + Spring Boot + MongoDB Research Form (JDoodle-Friendly Setup)

This project gives you a complete starter for a **long research question form**:
- React frontend (`frontend/`)
- Spring Boot backend (`backend/`)
- MongoDB database

> Important: JDoodle is great for running code snippets, but a full-stack app is usually easier if you run frontend and backend in separate online IDEs (or locally). This guide shows both the code and deployment flow.

## 1) Architecture

1. User fills long form in React.
2. React sends `POST` request to Spring Boot API.
3. Spring Boot validates and stores document in MongoDB.
4. You can retrieve all submissions via `GET /api/research-questions`.

## 2) Backend (Spring Boot + Java + MongoDB)

### Files included
- `backend/pom.xml`
- `backend/src/main/java/com/example/researchform/ResearchFormApplication.java`
- `backend/src/main/java/com/example/researchform/ResearchQuestion.java`
- `backend/src/main/java/com/example/researchform/ResearchQuestionRepository.java`
- `backend/src/main/java/com/example/researchform/ResearchQuestionController.java`
- `backend/src/main/resources/application.properties`

### Run backend locally

```bash
cd backend
mvn spring-boot:run
```

Default API: `http://localhost:8080`

### Run backend in online Spring Boot IDE

1. Create project with Java 17 + Maven.
2. Copy backend files.
3. Set environment variable:
   - `MONGODB_URI=<your_mongodb_connection_string>`
4. Run app.
5. Test health endpoint:
   - `GET /api/research-questions/health`

## 3) MongoDB setup (Atlas recommended)

1. Create free MongoDB Atlas cluster.
2. Create database user.
3. Whitelist access (for testing you may use `0.0.0.0/0`, but lock this later).
4. Get connection string, for example:

```text
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/research_form_db?retryWrites=true&w=majority
```

5. Add it as `MONGODB_URI` in your backend runtime.

## 4) Frontend (React)

### Files included
- `frontend/package.json`
- `frontend/public/index.html`
- `frontend/src/index.js`
- `frontend/src/App.js`
- `frontend/src/styles.css`

### Run frontend locally

```bash
cd frontend
npm install
npm start
```

Opens at `http://localhost:3000`

### Connect frontend to deployed backend

Set environment variable before running React:

```bash
export REACT_APP_API_URL="https://your-backend-domain"
npm start
```

## 5) API payload format

`POST /api/research-questions`

```json
{
  "title": "Impact of AI in Rural Healthcare",
  "researcherName": "Anita Sharma",
  "email": "anita@example.com",
  "institution": "ABC University",
  "domain": "Healthcare",
  "background": "Context...",
  "problemStatement": "Problem...",
  "objectives": "Objectives...",
  "methodology": "Methods...",
  "expectedOutcome": "Expected result...",
  "timeline": "6 months",
  "references": "WHO report, 2023"
}
```

## 6) JDoodle usage guidance

If you specifically want JDoodle:
- Use it to test individual Java classes/snippets, JSON handling, or helper logic.
- For full React app + persistent backend + MongoDB, use a cloud IDE (e.g., Replit/GitHub Codespaces) plus MongoDB Atlas.

## 7) Next improvements

- Add authentication (JWT/Spring Security).
- Add form draft-save feature.
- Add admin dashboard to review submissions.
- Add pagination and filtering for `GET` API.
