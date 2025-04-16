## 📄 API: `/api/plans`

---

### 🟢 `GET /api/plans`

#### 📌 Description:
Fetches all available subscription plans.

#### ✅ Method:
`GET`

#### 📤 Response:
```json
[
  {
    "id": "clx123...",
    "name": "Premium Plan",
    "price": 299,
    "description": "Best for large institutions",
    "features": ["Priority Support", "Unlimited Reviews"],
    "durationInDays": 30,
    "image": "https://res.cloudinary.com/..."
  },
  ...
]
```

---

### 🟢 `GET /api/plans/:plan_id`

#### 📌 Description:
Fetches a single subscription plan by its ID.

#### ✅ Method:
`GET`

#### 🔧 URL Params:
- `plan_id` (string, required): ID of the plan to fetch.

#### 📤 Response:
```json
{
  "id": "clx123...",
  "name": "Premium Plan",
  "price": 299,
  "description": "Best for large institutions",
  "features": ["Priority Support", "Unlimited Reviews"],
  "durationInDays": 30,
  "image": "https://res.cloudinary.com/..."
}
```

#### ❌ Errors:
```json
{
  "error": "Plan not found"
}
```

---

### 🟡 `POST /api/plans`

#### 📌 Description:
Creates a new subscription plan.

#### ✅ Method:
`POST`

#### 📥 Request Body:
```json
{
  "name": "Premium Plan",
  "price": 299,
  "description": "Best for large institutions",
  "features": ["Priority Support", "Unlimited Reviews"],
  "durationInDays": 30,
  "image": "data:image/png;base64,..." // optional
}
```

#### 📤 Response:
```json
{
  "id": "clx123...",
  "name": "Premium Plan",
  "price": 299,
  "description": "Best for large institutions",
  "features": ["Priority Support", "Unlimited Reviews"],
  "durationInDays": 30,
  "image": "https://res.cloudinary.com/..."
}
```

---

### 🟠 `PUT /api/plans/:plan_id`

#### 📌 Description:
Updates fields of an existing subscription plan.

#### ✅ Method:
`PUT`

#### 🔧 URL Params:
- `plan_id` (string, required): ID of the plan to update.

#### 📥 Request Body (partial allowed):
```json
{
  "name": "Updated Plan Name",
  "price": 399,
  "description": "Updated description",
  "features": ["Feature A", "Feature B"],
  "durationInDays": 60,
  "image": "data:image/png;base64,..." // optional
}
```

#### 📤 Response:
```json
{
  "id": "clx123...",
  "name": "Updated Plan Name",
  "price": 399,
  "description": "Updated description",
  "features": ["Feature A", "Feature B"],
  "durationInDays": 60,
  "image": "https://res.cloudinary.com/..."
}
```

#### ❌ Errors:
- Invalid field types.
- Plan not found.
- Internal Server Error.
