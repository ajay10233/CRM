## 📄 API: `/api/coupons`

---

### 🟢 `GET /api/coupons`

#### 📌 Description:
Fetches all available coupons.

#### ✅ Method:
`GET`

#### 📤 Response:
```json
[
  {
    "id": "clx123...",
    "name": "GOLD PLAN",
    "discountPercentage": 50,
    "startDate": "2025-04-20T00:00:00.000Z",
    "durationInDays": 10,
    "expiresAt": "2025-04-30T00:00:00.000Z",
    "createdAt": "2025-04-16T10:00:00.000Z",
    "updatedAt": "2025-04-16T10:00:00.000Z"
  },
  ...
]
```

---

### 🟢 `POST /api/coupons`

#### 📌 Description:
Creates a new coupon with the provided details. If `startDate` is not provided, a random date within the next 30 days is used.

#### ✅ Method:
`POST`

#### 📥 Body:
```json
{
  "name": "GOLD PLAN",
  "discountPercentage": 50,
  "startDate": "2025-04-20T00:00:00.000Z",  // Optional
  "durationInDays": 10
}
```

#### 📤 Response:
```json
{
  "id": "clx123...",
  "name": "GOLD PLAN",
  "discountPercentage": 50,
  "startDate": "2025-04-20T00:00:00.000Z",
  "durationInDays": 10,
  "expiresAt": "2025-04-30T00:00:00.000Z",
  "createdAt": "2025-04-16T10:00:00.000Z",
  "updatedAt": "2025-04-16T10:00:00.000Z"
}
```

---

## 📄 API: `/api/coupons/[id]/edit`

---

### 🟡 `PUT /api/coupons/:id/edit`

#### 📌 Description:
Updates a coupon with new values. `expiresAt` is **not recalculated** automatically (you can update it manually or add logic to recalculate it).

#### ✅ Method:
`PUT`

#### 🧩 URL Params:
- `id`: The ID of the coupon to update.

#### 📥 Body:
```json
{
  "name": "PLATINUM PLAN",
  "discountPercentage": 60,
  "startDate": "2025-04-22T00:00:00.000Z",
  "durationInDays": 15
}
```

#### 📤 Response:
```json
{
  "id": "clx123...",
  "name": "PLATINUM PLAN",
  "discountPercentage": 60,
  "startDate": "2025-04-22T00:00:00.000Z",
  "durationInDays": 15,
  "expiresAt": "2025-04-30T00:00:00.000Z",
  "createdAt": "2025-04-16T10:00:00.000Z",
  "updatedAt": "2025-04-16T10:10:00.000Z"
}
```

---

## 📄 API: `/api/coupons/[id]/delete`

---

### 🔴 `DELETE /api/coupons/:id/delete`

#### 📌 Description:
Deletes a specific coupon by ID.

#### ✅ Method:
`DELETE`

#### 🧩 URL Params:
- `id`: The ID of the coupon to delete.

#### 📤 Response:
```json
{
  "id": "clx123...",
  "name": "GOLD PLAN",
  "discountPercentage": 50,
  "startDate": "2025-04-20T00:00:00.000Z",
  "durationInDays": 10,
  "expiresAt": "2025-04-30T00:00:00.000Z",
  "createdAt": "2025-04-16T10:00:00.000Z",
  "updatedAt": "2025-04-16T10:00:00.000Z"
}
```


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

---

### 🔵 `GET /api/plans/get-all-users`

#### 📌 Description:
Fetches all users who have an active subscription plan, including their personal and plan details.

#### ✅ Method:
`GET`

#### 📤 Response:
```json
[
  {
    "id": "usr123...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "USER",
    "planActivatedAt": "2025-04-01T00:00:00.000Z",
    "planExpiresAt": "2025-05-01T00:00:00.000Z",
    "subscriptionPlan": {
      "id": "pln123...",
      "name": "Premium Plan",
      "price": 299,
      "features": ["Priority Support", "Unlimited Reviews"],
      "durationInDays": 30,
      "description": "Best for large institutions"
    }
  },
  ...
]
```

#### ❌ Errors:
```json
{
  "error": "Internal Server Error"
}
```