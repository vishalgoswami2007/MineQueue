# 🏥 MineQueue

### Real-Time Doctor Appointment & Healthcare Booking Platform

**MineQueue** is a production-oriented healthcare appointment platform designed to solve a real-world problem in online medical booking: **reliable appointment scheduling under concurrent traffic**.

Unlike a basic appointment CRUD application, MineQueue is designed around **concurrency control, race-condition prevention, real-time availability, secure authentication, role-based access control, and scalable backend architecture**.

The platform connects **patients, doctors, and healthcare providers** through a centralized booking system where appointment availability is synchronized in real time and competing booking requests are handled safely.

---

## 🚀 Why MineQueue?

Traditional appointment systems often treat booking as a simple:

```text
Check Slot → Create Appointment
```

That approach can fail when multiple users attempt to book the same slot simultaneously.

For example:

```text
10:00 AM — Dr. Sharma

Patient A ────────┐
                  ├── Both request the same slot
Patient B ────────┘

Without concurrency control:

Patient A → Booking SUCCESS
Patient B → Booking SUCCESS ❌

Result:
Double Booking
```

MineQueue is designed to solve this using **atomic operations, database constraints, short-lived distributed locks, transaction-safe booking workflows, and real-time synchronization**.

The goal is simple:

> **One appointment slot should never be successfully assigned to multiple patients.**

---

# ✨ Core Features

## 👤 Patient Experience

* Secure registration and login
* JWT-based authentication
* Protected patient dashboard
* Doctor discovery
* Search and filtering
* Doctor profile exploration
* Hospital discovery
* Real-time appointment availability
* Appointment booking
* Appointment cancellation
* Appointment history
* Patient profile management
* Appointment status tracking
* Real-time booking updates
* Notifications
* Secure session handling

---

## 👨‍⚕️ Doctor Experience

Doctors can manage their professional presence and availability.

### Doctor Dashboard

* Profile management
* Professional information
* Specialization
* Experience
* Consultation details
* Appointment management
* Schedule management
* Availability management
* Upcoming appointments
* Patient appointment history
* Appointment status updates
* Dashboard analytics

---

# 🔐 Authentication & Authorization

MineQueue follows a role-based security model.

```text
                    ┌──────────────┐
                    │ Authentication│
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
           PATIENT       DOCTOR        ADMIN
```

### Authentication

* JWT access tokens
* Password hashing using bcrypt
* Secure authentication middleware
* Protected API routes
* Token verification
* Session-aware frontend
* Logout/session invalidation strategy

### Role-Based Access Control

Different roles receive different permissions.

| Role    | Capabilities                                      |
| ------- | ------------------------------------------------- |
| Patient | Search doctors, book appointments, manage profile |
| Doctor  | Manage profile, schedule and appointments         |
| Admin   | Platform-level management and monitoring          |

Example authorization flow:

```text
Request
   ↓
JWT Verification
   ↓
User Identification
   ↓
Role Verification
   ↓
Permission Check
   ↓
Controller
```

---

# ⚡ Real-Time Appointment Booking

One of MineQueue's core engineering challenges is **real-time appointment booking**.

When a patient selects a slot, the backend verifies its current availability before creating the appointment.

Conceptually:

```text
Patient
   ↓
Select Doctor
   ↓
Select Date
   ↓
Select Time Slot
   ↓
Booking Request
   ↓
Validate Slot
   ↓
Acquire Lock
   ↓
Re-check Availability
   ↓
Create Appointment
   ↓
Release Lock
   ↓
Emit Real-Time Event
   ↓
Update Connected Clients
```

This prevents stale frontend information from becoming an invalid booking.

---

# 🏎️ Race Condition Prevention

### The Problem

Imagine a doctor has only one available slot:

```text
Doctor: Dr. Sharma
Date: 28 August
Time: 10:00 AM
```

At exactly the same time:

```text
Patient A → POST /appointments
Patient B → POST /appointments
```

Both requests may initially observe:

```text
slot.available = true
```

If the system simply performs:

```text
if available:
    create appointment
```

both requests may succeed.

That creates a **race condition**.

---

## 🧠 MineQueue Concurrency Strategy

The booking workflow is designed around:

### 1. Atomic database operations

Critical state transitions are performed atomically wherever possible.

### 2. Distributed locking

Redis can be used to create short-lived locks around critical booking operations.

Conceptually:

```text
LOCK doctor:doctorId:date:time
```

Only one booking request can enter the critical section at a time.

### 3. Double availability verification

The slot is checked:

```text
Before lock
       ↓
Acquire lock
       ↓
Check again
       ↓
Book
```

The second check is critical because the state may have changed while the request was waiting.

### 4. Database-level protection

Application-level locking alone should not be considered the final safety mechanism.

Database constraints / transactional logic provide an additional layer of protection against duplicate appointments.

---

# 🔒 Distributed Locking with Redis

For horizontally scaled deployments:

```text
             Load Balancer
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
   Node Server  Node Server  Node Server
       │           │           │
       └───────────┼───────────┘
                   ↓
                 Redis
                   │
             Distributed Lock
```

Redis allows multiple backend instances to coordinate access to the same booking resource.

Example conceptual key:

```text
booking-lock:{doctorId}:{date}:{slot}
```

The lock should be:

* Short-lived
* Time-bound
* Released after successful/failed execution
* Designed to avoid deadlocks
* Used only around the critical section

---

# 🔄 Real-Time Synchronization

MineQueue is designed to use **Socket.IO** for real-time events.

Example:

```text
Patient A books 10:00 AM
            ↓
Backend confirms booking
            ↓
Socket.IO event
            ↓
Connected clients receive update
            ↓
10:00 AM becomes unavailable
```

This avoids users seeing outdated availability for long periods.

Potential real-time events:

```text
appointment:created
appointment:cancelled
appointment:updated
slot:reserved
slot:released
notification:new
```

---

# 🏗️ System Architecture

High-level architecture:

```text
                         ┌──────────────────┐
                         │      Client      │
                         │ React + Vite     │
                         └────────┬─────────┘
                                  │
                           HTTPS / WebSocket
                                  │
                    ┌─────────────▼─────────────┐
                    │       API Layer           │
                    │     Node.js + Express     │
                    └─────────────┬─────────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
       Authentication         Booking Engine       Services
             │                    │                    │
             ▼                    ▼                    ▼
           JWT                  Redis             Socket.IO
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                           ┌──────▼──────┐
                           │   MongoDB   │
                           └─────────────┘
```

---

# 🧩 Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* React Router
* Context API
* Tailwind CSS
* Axios
* Socket.IO Client

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Redis
* Socket.IO

## Infrastructure & Services

* Git & GitHub
* Cloudinary
* Email service
* Payment gateway
* Docker
* Redis
* MongoDB Atlas
* Deployment platform

## External APIs

Planned integrations may include:

* Google Maps
* Google Places
* Geolocation services
* Weather API
* Email APIs
* Payment APIs
* AI APIs

---

# 🗄️ Data Model

The platform can be modeled around several core entities.

```text
User
 │
 ├── Patient Profile
 │
 ├── Doctor Profile
 │
 └── Admin

Doctor
 │
 ├── Specialization
 ├── Availability
 ├── Schedule
 └── Appointments

Patient
 │
 ├── Profile
 ├── Appointments
 └── Notifications

Appointment
 │
 ├── Patient
 ├── Doctor
 ├── Date
 ├── Time Slot
 ├── Status
 └── Booking Metadata
```

---

# 📅 Appointment Lifecycle

An appointment can move through a controlled state machine:

```text
AVAILABLE
    ↓
LOCKED
    ↓
BOOKED
    ↓
CONFIRMED
    ↓
COMPLETED
```

Alternative paths:

```text
LOCKED → EXPIRED
BOOKED → CANCELLED
CONFIRMED → CANCELLED
```

This makes appointment state transitions explicit instead of relying on loosely defined boolean fields.

---

# 🛡️ Security

MineQueue is designed with security as a first-class concern.

### Application Security

* Password hashing
* JWT authentication
* Authorization middleware
* Input validation
* Request sanitization
* Secure API design
* Environment variables
* Sensitive configuration isolation
* Rate limiting
* CORS configuration
* Secure HTTP headers
* Error handling without sensitive information leakage

### Data Protection

Sensitive configuration should never be committed:

```text
.env
.env.local
credentials
private keys
API secrets
database passwords
JWT secrets
```

---

# 🧪 Validation

Backend validation should happen at multiple layers:

```text
Frontend Validation
        ↓
API Validation
        ↓
Business Logic Validation
        ↓
Database Constraints
```

Never trust frontend validation alone.

Examples:

* Invalid appointment date
* Past booking time
* Invalid doctor ID
* Duplicate appointment
* Unauthorized appointment cancellation
* Invalid role
* Malformed request payload

---

# 📈 Scalability

MineQueue is designed with horizontal scaling in mind.

A future production architecture could look like:

```text
                         Load Balancer
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
          API Server 1    API Server 2    API Server 3
              │               │               │
              └───────────────┼───────────────┘
                              │
                 ┌────────────┴────────────┐
                 ↓                         ↓
               Redis                    MongoDB
                 │
          Distributed Locks
          Cache / Pub-Sub
```

This architecture allows the application to scale beyond a single Node.js process.

---

# ☁️ Cloudinary Integration

Doctor profiles and healthcare-related media can be uploaded through Cloudinary rather than storing large binary files directly inside MongoDB.

Flow:

```text
Client
  ↓
Upload
  ↓
Backend
  ↓
Cloudinary
  ↓
Secure URL
  ↓
MongoDB
```

MongoDB stores metadata/reference URLs while Cloudinary handles media storage and delivery.

---

# 💳 Payment Integration

Future appointment flows can support online payments.

Example:

```text
Select Appointment
       ↓
Calculate Consultation Fee
       ↓
Create Payment Order
       ↓
Payment Gateway
       ↓
Payment Verification
       ↓
Confirm Appointment
```

**Important:** appointment confirmation should not rely only on a frontend payment-success response. The backend should independently verify payment status before finalizing a paid appointment.

---

# 📧 Notifications

MineQueue can provide multi-channel notifications.

### Email

* Appointment confirmation
* Cancellation
* Reminder
* Doctor schedule changes
* Password reset

### Real-Time

* Booking updates
* Slot availability
* Appointment status
* Notifications

### Future

* WhatsApp notifications
* SMS reminders
* Push notifications

---

# 🗺️ Location & Hospital Discovery

Potential Google Maps / Places integration can enable:

* Nearby hospital discovery
* Hospital search
* Doctor location
* Distance calculation
* Map-based exploration
* Location-aware healthcare discovery

Conceptually:

```text
Patient Location
      ↓
Location Service
      ↓
Google Maps / Places
      ↓
Nearby Healthcare Providers
      ↓
Map + List UI
```

---

# 🤖 AI Integration — Future Roadmap

MineQueue can eventually include AI-powered healthcare navigation features.

Potential features:

* AI doctor discovery assistant
* Natural-language doctor search
* Appointment assistance
* FAQ assistant
* Healthcare navigation
* Personalized provider discovery

Example:

```text
User:
"I need a dermatologist near me
available tomorrow evening."

             ↓

        AI Assistant

             ↓

Search Doctors
             ↓
Check Location
             ↓
Check Availability
             ↓
Return Matching Doctors
```

> AI features are intended for navigation and assistance, not medical diagnosis or emergency medical decision-making.

---

# 🧑‍💼 Admin Dashboard

The admin layer can provide centralized platform management.

Potential capabilities:

* User management
* Doctor verification
* Appointment monitoring
* Hospital management
* Platform analytics
* Report management
* Suspicious activity monitoring
* System health overview
* Role management

---

# 📊 Observability & Reliability

For production deployment, MineQueue can be extended with:

* Structured logging
* Request tracing
* Error monitoring
* Health-check endpoints
* Database monitoring
* Redis monitoring
* API latency tracking
* Booking failure metrics
* Authentication failure metrics

Example health endpoint:

```text
GET /api/health
```

Possible response:

```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected"
}
```

---

# 🧪 Testing Strategy

A production booking platform requires more than manual testing.

### Unit Tests

Test individual business functions.

### Integration Tests

Test:

```text
API → Database
API → Redis
API → Authentication
```

### Concurrency Tests

Critical for MineQueue.

Example:

```text
100 simultaneous booking requests
            ↓
      Same doctor
            ↓
       Same slot
            ↓
      Expected result:
   Exactly ONE successful booking
```

### End-to-End Tests

Simulate:

```text
Register
   ↓
Login
   ↓
Find Doctor
   ↓
Select Slot
   ↓
Book Appointment
   ↓
Receive Confirmation
```

---

# 🐳 Docker

MineQueue can be containerized for consistent development and deployment.

Potential services:

```text
┌─────────────────────────┐
│       Frontend          │
│        React            │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│        Backend          │
│    Node + Express       │
└───────┬─────────┬───────┘
        │         │
        ▼         ▼
    MongoDB      Redis
```

Docker provides environment consistency across:

```text
Development
Testing
Staging
Production
```

---

# 📁 Project Structure

Target architecture:

```text
MineQueue/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

# 🔌 API Architecture

Example API organization:

```text
/api/auth
/api/users
/api/doctors
/api/patients
/api/hospitals
/api/appointments
/api/schedules
/api/notifications
/api/admin
```

Example appointment endpoints:

```text
POST   /api/appointments
GET    /api/appointments/:id
GET    /api/appointments/my
PATCH  /api/appointments/:id/cancel
```

---

# 🧠 Engineering Principles

MineQueue is built around several engineering principles:

### 1. Correctness over convenience

Booking correctness is more important than simply returning a successful HTTP response.

### 2. Backend is the source of truth

The frontend displays availability, but the backend ultimately decides whether a slot can be booked.

### 3. Defense in depth

Race-condition protection should not depend on a single mechanism.

```text
Application Validation
        +
Distributed Lock
        +
Atomic Operations
        +
Database Constraints
```

### 4. Explicit state transitions

Appointments should move through controlled states.

### 5. Secure by default

Authentication, authorization and validation are part of the architecture rather than afterthoughts.

### 6. Designed for scale

The system should be capable of evolving from a single-server application toward horizontally scaled infrastructure.

---

# 🚦 Booking Failure Scenarios

MineQueue should gracefully handle cases such as:

```text
Slot already booked
      ↓
HTTP 409 Conflict
```

```text
Slot lock expired
      ↓
Booking retry / failure response
```

```text
Invalid doctor
      ↓
HTTP 404 Not Found
```

```text
Unauthorized request
      ↓
HTTP 401 Unauthorized
```

```text
Insufficient permission
      ↓
HTTP 403 Forbidden
```

```text
Invalid input
      ↓
HTTP 400 Bad Request
```

This makes API behavior predictable for frontend clients.

---

# 📌 Development Roadmap

## Phase 1 — Frontend

* [x] Landing page
* [x] Authentication UI
* [x] Patient interface
* [x] Doctor dashboard UI
* [x] Appointment UI
* [x] Schedule UI
* [x] Hospital discovery UI

## Phase 2 — Backend Foundation

* [ ] Express server
* [ ] MongoDB connection
* [ ] Mongoose models
* [ ] Authentication
* [ ] JWT
* [ ] bcrypt
* [ ] Validation
* [ ] Error handling
* [ ] API architecture

## Phase 3 — Booking Engine

* [ ] Doctor availability
* [ ] Appointment creation
* [ ] Appointment cancellation
* [ ] Atomic booking logic
* [ ] Race-condition prevention
* [ ] Redis locking
* [ ] Transaction-safe workflow
* [ ] Concurrency testing

## Phase 4 — Real-Time Infrastructure

* [ ] Socket.IO
* [ ] Live slot updates
* [ ] Appointment notifications
* [ ] Real-time dashboard updates

## Phase 5 — Production Features

* [ ] Cloudinary
* [ ] Email notifications
* [ ] Payment gateway
* [ ] Google Maps / Places
* [ ] Admin analytics
* [ ] Docker
* [ ] Production deployment
* [ ] Monitoring

## Phase 6 — Intelligence Layer

* [ ] AI appointment assistant
* [ ] Natural-language doctor discovery
* [ ] Smart healthcare navigation
* [ ] AI-powered FAQ assistant

---

# 🎯 Project Objective

MineQueue is not intended to be just another MERN CRUD application.

The primary objective is to demonstrate how a real-world system can be engineered around difficult backend problems such as:

```text
Authentication
      +
Authorization
      +
Concurrency
      +
Race Conditions
      +
Distributed Locking
      +
Real-Time Communication
      +
Data Consistency
      +
Scalability
      +
Security
```

The project focuses on building a system where **correctness, reliability and scalability are treated as core product requirements**.

---

# 👨‍💻 Author

**Vishal Goswami**

Full-Stack MERN Developer focused on building production-oriented web applications, scalable backend systems and real-world products.

---

## ⭐ If you find MineQueue interesting

Star the repository and follow the development journey as the platform evolves from a frontend prototype into a production-oriented real-time healthcare booking system.
