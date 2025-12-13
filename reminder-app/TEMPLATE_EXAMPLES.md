# 📚 Template Usage Examples

This document provides real-world examples of how to customize this template for different types of projects.

## Example 1: Todo List App

### Configuration
```json
{
  "project": {
    "name": "todo-app",
    "displayName": "Todo List App"
  },
  "api": {
    "modelName": "Todo",
    "routePrefix": "todos"
  },
  "mobile": {
    "packageName": "todoapp",
    "appName": "TodoApp"
  }
}
```

### Model Customization
```javascript
// backend/src/models/Todo.js
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  dueDate: Date
});
```

### Route Updates
- `/api/todos` - CRUD operations
- Frontend: `TodoList.jsx`, `TodoForm.jsx`
- Mobile: `TodoScreen.js`, `AddTodoScreen.js`

---

## Example 2: Expense Tracker

### Configuration
```json
{
  "project": {
    "name": "expense-tracker",
    "displayName": "Expense Tracker"
  },
  "api": {
    "modelName": "Expense",
    "routePrefix": "expenses"
  },
  "mobile": {
    "packageName": "expensetracker",
    "appName": "ExpenseTracker"
  }
}
```

### Model Customization
```javascript
// backend/src/models/Expense.js
const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  paymentMethod: String
});
```

### Additional Features
- Add category model
- Add budget tracking
- Add reporting routes

---

## Example 3: Notes App

### Configuration
```json
{
  "project": {
    "name": "notes-app",
    "displayName": "My Notes"
  },
  "api": {
    "modelName": "Note",
    "routePrefix": "notes"
  },
  "mobile": {
    "packageName": "notesapp",
    "appName": "NotesApp"
  }
}
```

### Model Customization
```javascript
// backend/src/models/Note.js
const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  color: String,
  isPinned: { type: Boolean, default: false }
});
```

---

## Example 4: Event Planner

### Configuration
```json
{
  "project": {
    "name": "event-planner",
    "displayName": "Event Planner"
  },
  "api": {
    "modelName": "Event",
    "routePrefix": "events"
  },
  "mobile": {
    "packageName": "eventplanner",
    "appName": "EventPlanner"
  }
}
```

### Model Customization
```javascript
// backend/src/models/Event.js
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  location: String,
  attendees: [String],
  category: String
});
```

### Additional Features
- Calendar view
- Notification scheduling
- Attendee management

---

## Example 5: Fitness Tracker

### Configuration
```json
{
  "project": {
    "name": "fitness-tracker",
    "displayName": "Fitness Tracker"
  },
  "api": {
    "modelName": "Workout",
    "routePrefix": "workouts"
  },
  "mobile": {
    "packageName": "fitnesstracker",
    "appName": "FitnessTracker"
  }
}
```

### Model Customization
```javascript
// backend/src/models/Workout.js
const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: Number, // in minutes
  calories: Number,
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number
  }],
  date: { type: Date, default: Date.now }
});
```

---

## Customization Patterns

### Pattern 1: Multiple Models

For apps with multiple models:

1. **Create additional models:**
   ```bash
   cp backend/src/models/Reminder.js backend/src/models/Category.js
   ```

2. **Create additional routes:**
   ```bash
   cp backend/src/routes/reminders.js backend/src/routes/categories.js
   ```

3. **Update server.js:**
   ```javascript
   app.use('/api/categories', require('./src/routes/categories'));
   ```

### Pattern 2: Authentication

Add authentication:

1. **Install packages:**
   ```bash
   cd backend
   npm install jsonwebtoken bcryptjs
   ```

2. **Create auth routes:**
   ```bash
   touch backend/src/routes/auth.js
   ```

3. **Add middleware:**
   ```bash
   touch backend/src/middleware/auth.js
   ```

### Pattern 3: File Uploads

Add file upload capability:

1. **Install packages:**
   ```bash
   cd backend
   npm install multer
   ```

2. **Create upload route:**
   ```bash
   touch backend/src/routes/upload.js
   ```

3. **Configure storage:**
   - Local storage
   - Cloud storage (AWS S3, etc.)

### Pattern 4: Real-time Updates

Add WebSocket support:

1. **Install packages:**
   ```bash
   cd backend
   npm install socket.io
   ```

2. **Update server.js:**
   ```javascript
   const http = require('http');
   const io = require('socket.io')(http);
   ```

3. **Update frontend:**
   ```bash
   cd web
   npm install socket.io-client
   ```

---

## Best Practices

### 1. Naming Conventions

- **Project name:** lowercase, hyphenated (`my-awesome-app`)
- **Package name:** lowercase, no spaces (`myawesomeapp`)
- **App name:** PascalCase (`MyAwesomeApp`)
- **Model name:** Singular, PascalCase (`Task`, `User`, `Product`)
- **Route prefix:** Plural, lowercase (`tasks`, `users`, `products`)

### 2. File Organization

```
backend/src/
├── models/          # Database models
├── routes/           # API routes
├── controllers/      # Business logic (optional)
├── middleware/      # Custom middleware
├── utils/           # Helper functions
└── cron/            # Scheduled tasks
```

### 3. API Design

- Use RESTful conventions
- Consistent error responses
- Version your API (`/api/v1/...`)
- Document with OpenAPI/Swagger

### 4. Frontend Structure

```
web/src/
├── pages/           # Route components
├── components/      # Reusable components
├── hooks/           # Custom hooks
├── services/        # API services
├── utils/           # Helper functions
└── styles/          # Global styles
```

### 5. Mobile Structure

```
mobile/src/
├── screens/         # Screen components
├── components/      # Reusable components
├── services/        # API services
├── navigation/      # Navigation config
├── hooks/           # Custom hooks
└── utils/           # Helper functions
```

---

## Migration Checklist

When converting from template to your project:

- [ ] Run setup script
- [ ] Update all package.json files
- [ ] Rename model files
- [ ] Update model schemas
- [ ] Rename route files
- [ ] Update route paths
- [ ] Rename frontend components
- [ ] Update API calls
- [ ] Update mobile screens
- [ ] Update Android package
- [ ] Update iOS bundle ID
- [ ] Update README files
- [ ] Remove template-specific files (optional)
- [ ] Update documentation
- [ ] Test all platforms

---

## Tips & Tricks

1. **Keep the template clean:** Don't modify the original template
2. **Version your template:** Tag stable versions
3. **Document customizations:** Keep notes on what you changed
4. **Test thoroughly:** Test on all platforms after customization
5. **Use Git:** Commit after setup script, then customize incrementally

---

**Need more examples? Check the [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) for detailed instructions.**

