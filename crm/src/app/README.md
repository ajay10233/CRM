# Create Coupon API

## Endpoint
```http
POST /api/coupon
```

## Description
Creates a new coupon with the given details like name, discount percentage, start date, purpose, duration, and optional usage limit.

---

## Request Payload

| Field               | Type    | Required | Description |
|---------------------|---------|----------|-------------|
| `name`              | string  | Yes      | The name of the coupon. |
| `discountPercentage`| number  | Yes      | Discount percentage (must be between 0 and 100). |
| `startDate`         | string (ISO Date) | No  | Start date for the coupon. If not provided, random future date is assigned. |
| `purpose`           | string  | Yes      | Purpose or description of the coupon. |
| `durationInDays`    | number  | Yes      | Number of days the coupon is valid for (must be > 0). |
| `limit`             | number  | No       | Maximum number of times the coupon can be used. Default: `-1` (unlimited). |

### Example Request Body
```json
{
  "name": "SUMMER50",
  "discountPercentage": 50,
  "startDate": "2025-05-01T00:00:00.000Z",
  "purpose": "Summer Sale",
  "durationInDays": 10,
  "limit": 100
}
```

---

## Success Response

- **Code:** `200 OK`
- **Content:**
```json
{
  "id": "coupon_id_generated_by_db",
  "name": "SUMMER50",
  "discountPercentage": 50,
  "startDate": "2025-05-01T00:00:00.000Z",
  "durationInDays": 10,
  "expiresAt": "2025-05-11T00:00:00.000Z",
  "purpose": "Summer Sale",
  "limit": 100,
  "createdAt": "2025-04-26T10:00:00.000Z",
  "updatedAt": "2025-04-26T10:00:00.000Z"
}
```

> Note: `createdAt` and `updatedAt` are automatically handled by the database.

---

## Error Responses

| Status Code | Message |
|-------------|---------|
| 400         | `{ "error": "Missing fields" }` - If required fields are missing. |
| 400         | `{ "error": "durationInDays must be a positive number" }` - If `durationInDays` is 0 or negative. |
| 400         | `{ "error": "discountPercentage must be a positive number between 0 and 100" }` - If `discountPercentage` is invalid. |









# 📤 Upload Admin Image API

## **Endpoint**
```
POST /api/admin/image-upload
```

## **Description**
This endpoint uploads a base64 image to Cloudinary, saves its URL along with additional details in the database.

---

## 🔐 **Authorization**
No authentication required (modify based on your app’s auth rules).

---

## 📥 Request Payload

### **Headers**
```http
Content-Type: application/json
```

### **Body**
```json
{
  "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "details": "Admin profile image" // Optional textual detail
}
```

| Field        | Type   | Required | Description                    |
|--------------|--------|----------|--------------------------------|
| `base64Image`| string | ✅       | The image encoded in base64    |
| `details`    | string | ❌       | Any additional image context   |

---

## 📤 Response

### ✅ **Success (200 OK)**

```json
{
  "id": "cluiwm1o60000v0f6xxtjhzqt",
  "link": "https://res.cloudinary.com/demo/image/upload/v1713387292/admin_images/uuid.png",
  "details": "Admin profile image",
  "createdAt": "2025-04-18T09:45:00.123Z"
}
```

| Field     | Type   | Description                        |
|-----------|--------|------------------------------------|
| `id`      | string | Unique image ID in the database    |
| `link`    | string | Cloudinary image URL               |
| `details` | string | Context provided during upload     |
| `createdAt` | string | Timestamp of when image was stored |

---

### ❌ **Error (400 Bad Request)**
```json
{
  "error": "No image provided"
}
```

### ❌ **Error (500 Internal Server Error)**
```json
{
  "error": "Internal server error"
}
```

---

## 📌 Notes

- Ensure `base64Image` is a valid base64-encoded image string with proper data URI format.
- Images are stored in the Cloudinary folder: `admin_images/`.
- A UUID is used as the public ID in Cloudinary for uniqueness.
- Image metadata is saved in a Prisma model `adminImages`.


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