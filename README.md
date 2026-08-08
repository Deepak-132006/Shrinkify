# 🔗 Shrinkify

**Shrinkify** is a URL shortening service built with **Java and Spring Boot** that converts long URLs into short, easy-to-share links.

The application generates a **unique Base62 short code** for each URL and redirects users to the original URL when the shortened link is accessed. It also tracks **click/visit analytics** for shortened URLs.

---

## 🚀 Features

* 🔗 **URL Shortening** – Convert long URLs into compact short links.
* ⚡ **Fast URL Redirection** – Redirect users from a short URL to the original URL.
* 🔐 **Unique Short Codes** – Generates unique short codes using a **Base62 algorithm**.
* 📊 **Click Analytics** – Track the number of visits/clicks for each shortened URL.
* 💾 **Persistent Storage** – Stores URL information and analytics data in PostgreSQL.
* 🌐 **RESTful API** – Backend functionality is exposed through REST APIs.

---

## 🛠️ Tech Stack

### Backend

* **Java**
* **Spring Boot**
* **Spring Data JPA**
* **Hibernate**
* **REST APIs**

### Database

* **PostgreSQL**

### Build Tool

* **Maven**

### Development Tools

* **Git**
* **GitHub**
* **Postman**

---

## 🏗️ Project Architecture

Shrinkify follows a layered Spring Boot architecture:

```text
Client
   │
   ▼
REST Controller
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
PostgreSQL Database
```

### Main Components

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Entity
   ↓
PostgreSQL
```

* **Controller** – Handles incoming HTTP requests and API responses.
* **Service** – Contains the business logic.
* **Repository** – Communicates with the PostgreSQL database using JPA.
* **Entity** – Represents persistent database objects.

---

## 🔄 How Shrinkify Works

### 1. URL Shortening

The user provides a long URL through the REST API.

```text
Long URL
   ↓
Shrinkify
   ↓
Generate Unique Base62 Code
   ↓
Store URL + Short Code
   ↓
Return Short URL
```

For example:

```text
Original URL:
https://example.com/some/very/long/url

Short URL:
https://your-domain/{shortCode}
```

---

### 2. Base62 Short Code Generation

Shrinkify uses a **Base62 encoding approach** to generate compact URL identifiers.

Base62 uses:

```text
A-Z
a-z
0-9
```

This provides **62 possible characters** for each position in the generated code.

The resulting short code is compact while providing a large number of possible combinations.

Example:

```text
Long URL
   ↓
Unique Identifier
   ↓
Base62 Conversion
   ↓
Short Code
```

---

## 📊 Click Analytics

Shrinkify keeps track of visits to shortened URLs.

Whenever a user accesses a short URL:

```text
Short URL
    ↓
Find Original URL
    ↓
Increment Click Count
    ↓
Redirect to Original URL
```

This allows the application to provide basic information about how frequently a shortened URL is accessed.

Example:

```text
Short URL: abc123
Clicks:    27
```

---

## 🗄️ Database

Shrinkify uses **PostgreSQL** for persistent data storage.

The database stores information required for:

* Original URLs
* Generated short codes
* Click/visit counts
* URL-related metadata

The application communicates with PostgreSQL through **Spring Data JPA and Hibernate**.

---

## 🔌 REST API

The application provides REST endpoints for URL shortening and retrieving URL information.

### Shorten URL

```http
POST /api/v1/urls/shorten
```

Example request:

```json
{
  "url": "https://example.com/very-long-url"
}
```

Example response:

```json
{
  "shortUrl": "https://your-domain/abc123"
}
```

### Redirect

```http
GET /{shortCode}
```

The server finds the corresponding original URL and redirects the user.

### Analytics

An analytics endpoint can be used to retrieve the visit/click information associated with a shortened URL.

> Replace the endpoint names above with your exact controller mappings if they differ in your current implementation.

---

## 📁 Project Structure

A typical Shrinkify Spring Boot structure:

```text
src/
└── main/
    ├── java/
    │   └── ...
    │       ├── controller/
    │       ├── service/
    │       ├── repository/
    │       ├── entity/
    │       ├── dto/
    │       └── ...
    │
    └── resources/
        └── application.properties
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* Java 17+
* Maven
* PostgreSQL
* Git

### Clone the Repository

```bash
git clone <your-repository-url>
cd shrinkify
```

### Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE shrinkify;
```

Configure the database connection in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/shrinkify
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

Use your actual database credentials rather than committing them to GitHub.

---

## ▶️ Run the Application

Using Maven:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The application will start on the configured Spring Boot port.

---

## 🧪 Testing

The REST APIs can be tested using tools such as **Postman**.

Typical workflow:

```text
1. Send a long URL
        ↓
2. Receive a short URL
        ↓
3. Open the short URL
        ↓
4. Get redirected to the original URL
        ↓
5. Check click/visit analytics
```

---

## 🔐 Configuration & Security

Sensitive configuration such as database credentials should not be committed to the repository.

Use environment variables or an external configuration mechanism for production deployments.

Example:

```text
DB_USERNAME
DB_PASSWORD
DB_URL
```

---

## 🎯 Project Objectives

The main objectives of Shrinkify are:

* Build a practical backend application using Spring Boot.
* Understand REST API development.
* Implement URL shortening logic.
* Generate compact unique identifiers using Base62.
* Work with PostgreSQL and JPA/Hibernate.
* Implement URL redirection.
* Track URL usage through click analytics.
* Gain practical experience in backend application development.

---

## 📚 What I Learned

Through Shrinkify, I gained practical experience in:

* Java backend development
* Spring Boot
* REST API design
* Spring Data JPA
* Hibernate ORM
* PostgreSQL
* Database relationships and persistence
* Base62 encoding
* URL redirection
* Click/visit tracking
* API testing with Postman
* Backend project structure and deployment

---

## 🔮 Future Improvements

Possible improvements for future versions include:

* 👤 User accounts and authentication
* 📈 Advanced analytics dashboard
* 🌍 Custom short URLs
* ⏳ URL expiration
* 🗑️ URL deletion and management
* 📊 Detailed analytics such as browser, device, and geographic statistics
* 🛡️ Rate limiting and abuse prevention
* 🔑 JWT-based authentication
* 📱 Responsive frontend dashboard

---

## 👨‍💻 Author

**Deepak N**

B.Tech Information Technology

Interested in **Backend Development, Full-Stack Development, Cloud, and DevOps**.

---

## ⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
