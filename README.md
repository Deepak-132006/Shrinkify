# 🔗 Shrinkify – URL Shortening & Analytics Platform

Shrinkify is a full-stack URL shortening application built using **Java, Spring Boot, and PostgreSQL**. It allows users to convert long URLs into short, shareable links using a **Base62-based unique code generation algorithm**.

The application also provides **click/visit analytics**, allowing users to monitor how many times their shortened URLs have been accessed.

#### Project Link: [View Project](https://shrinkify-seven.vercel.app/)

---

## 📸 Screenshots

![Shrinkify Dashboard](https://github.com/Deepak-132006/Shrinkify/blob/main/output/dashboard.png?raw=true)

---

## 🎯 Project Overview

The goal of Shrinkify was to build a practical backend-focused web application while gaining hands-on experience with **Spring Boot, REST APIs, PostgreSQL, URL encoding algorithms, and deployment**.

The application follows a simple workflow:

```text
Long URL
   ↓
Shrinkify
   ↓
Generate Unique Base62 Code
   ↓
Store URL in PostgreSQL
   ↓
Generate Short URL
   ↓
Track Visits
```

### Key Objectives:

* **URL Shortening:** Convert long URLs into compact, shareable links.
* **Unique Code Generation:** Generate unique short identifiers using the Base62 algorithm.
* **URL Redirection:** Redirect users from a shortened URL to the original destination.
* **Click Analytics:** Track the number of visits made through shortened URLs.
* **Backend Development:** Build RESTful APIs using Java and Spring Boot.
* **Database Integration:** Persist URL and analytics data using PostgreSQL.

---

## 🏗️ System Architecture

Shrinkify follows a layered backend architecture:

1. **Presentation Layer:** Web interface for submitting URLs and viewing generated links.
2. **Application Layer:** Spring Boot application handling URL generation, redirection, and analytics.
3. **Data Layer:** PostgreSQL database for persistent URL and visit information.

```text
                 ┌─────────────────────┐
                 │       Frontend      │
                 │    Web Interface    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    Spring Boot      │
                 │    REST APIs        │
                 └──────────┬──────────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
        ┌────────────────┐    ┌────────────────┐
        │ URL Shortening │    │ Click Tracking │
        │    Service     │    │    Service     │
        └────────┬───────┘    └───────┬────────┘
                 │                     │
                 └──────────┬──────────┘
                            ▼
                 ┌─────────────────────┐
                 │     PostgreSQL      │
                 │      Database       │
                 └─────────────────────┘
```

---

## ⚙️ Tech Stack

| Layer               | Technology                  |
| :------------------ | :-------------------------- |
| **Language**        | Java                        |
| **Backend**         | Spring Boot                 |
| **API**             | REST API                    |
| **ORM**             | Spring Data JPA / Hibernate |
| **Database**        | PostgreSQL                  |
| **Short Code**      | Base62 Algorithm            |
| **Frontend**        | Web-based UI                |
| **Deployment**      | Vercel                      |
| **Build Tool**      | Maven                       |
| **API Testing**     | Postman                     |
| **Version Control** | Git & GitHub                |

---

## 🔗 Core Features

### 1. URL Shortening

Users can submit a long URL through the Shrinkify interface.

The application processes the URL and generates a unique short code.

```text
Long URL
    ↓
Validate URL
    ↓
Generate Unique Identifier
    ↓
Base62 Encoding
    ↓
Store Mapping
    ↓
Return Short URL
```

For example:

```text
Original URL:
https://example.com/a/very/long/url/path

Short URL:
https://shrinkify-seven.vercel.app/abc123
```

---

### 2. Base62 Code Generation

Shrinkify uses the **Base62 algorithm** to generate compact URL identifiers.

Base62 uses 62 characters:

```text
A-Z
a-z
0-9
```

This provides a large number of possible combinations while keeping the generated short URLs compact.

The general process is:

```text
Unique Numeric Identifier
          ↓
      Base62 Encoding
          ↓
     Short Code
```

This approach makes the generated URLs significantly shorter than the original URLs.

---

### 3. URL Redirection

When a user accesses a shortened URL, Shrinkify identifies the corresponding original URL and redirects the user.

```text
Short URL
    ↓
Find Short Code
    ↓
Lookup PostgreSQL
    ↓
Retrieve Original URL
    ↓
Increment Visit Count
    ↓
Redirect User
```

---

### 4. 📊 Click / Visit Analytics

Shrinkify tracks visits to shortened URLs.

Each time a short URL is accessed, the application's analytics data can be updated to reflect the visit.

A dedicated statistics page is available for individual short links:

**Example:** [View Stats](https://shrinkify-seven.vercel.app/stats/3)

This provides a foundation for monitoring the usage of shortened URLs.

---

## 🗄️ Database

Shrinkify uses **PostgreSQL** as its relational database.

The database is responsible for storing the mapping between:

```text
Short Code  →  Original URL
```

It also maintains information required for tracking URL visits.

### Database Workflow

```text
Application
     │
     ▼
Spring Data JPA
     │
     ▼
Hibernate
     │
     ▼
PostgreSQL
```

Using PostgreSQL provides persistent and structured storage for the URL-shortening system.

---

## 🔄 URL Shortening Workflow

The complete URL-shortening process works as follows:

```text
┌──────────────┐
│ User submits │
│   long URL   │
└──────┬───────┘
       │
       ▼
┌─────────────────┐
│ Spring Boot API │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Generate unique │
│    short code   │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Base62 encoding │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│    PostgreSQL   │
│ Store URL + ID  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Return shortened│
│      URL        │
└─────────────────┘
```

---

## 📈 Analytics Workflow

When a shortened URL is accessed:

```text
User opens Short URL
        ↓
Identify Short Code
        ↓
Find URL in Database
        ↓
Increase Visit Count
        ↓
Redirect to Original URL
        ↓
Analytics Updated
```

This separates the URL-redirection logic from the analytics functionality while keeping both connected through the stored URL record.

---

## 🔌 API Design

Shrinkify uses RESTful APIs to handle URL-shortening operations.

| Method | Endpoint       | Description                  |
| :----- | :------------- | :--------------------------- |
| `POST` | `/...`         | Create a shortened URL       |
| `GET`  | `/{shortCode}` | Redirect to the original URL |
| `GET`  | `/stats/{id}`  | View URL statistics          |

> The exact API mappings can be updated here if the controller endpoints change in the project.

---

## ⚠️ Challenges & Solutions

Building Shrinkify involved solving several backend development challenges:

* **Unique Short Codes:** Implemented Base62-based code generation to create compact identifiers.
* **URL Mapping:** Designed a database mapping between generated short codes and original URLs.
* **Redirection:** Implemented logic to efficiently retrieve the original URL from the short identifier.
* **Click Tracking:** Added visit-count tracking whenever shortened URLs are accessed.
* **Database Integration:** Connected Spring Boot with PostgreSQL using JPA/Hibernate.
* **Deployment:** Configured the application for a production deployment environment instead of relying only on localhost.
* **Frontend-Backend Communication:** Connected the web interface with the backend URL-shortening functionality.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Java
* Maven
* PostgreSQL
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/Deepak-132006/Shrinkify.git
cd Shrinkify
```

### 2. Configure PostgreSQL

Create a PostgreSQL database for the application.

Configure your database connection in the Spring Boot configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/shrinkify
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build the Application

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The application can then be accessed through the configured application URL.

---

## 🧪 Testing

The REST APIs can be tested using **Postman** or directly through the deployed web application.

Typical testing workflow:

```text
1. Submit a long URL
        ↓
2. Receive a shortened URL
        ↓
3. Open the shortened URL
        ↓
4. Verify redirection
        ↓
5. Check visit statistics
```

---

## 🎓 What I Learned

Through Shrinkify, I gained practical experience in:

* Java backend development
* Spring Boot
* REST API development
* Spring Data JPA
* Hibernate
* PostgreSQL
* Base62 encoding
* URL shortening algorithms
* HTTP redirection
* Click/visit analytics
* Database persistence
* Frontend-backend integration
* Application deployment
* Git and GitHub

---

## 🔮 Future Improvements

Potential improvements for future versions include:

* 👤 User authentication and accounts
* 🔗 Custom short URLs
* ⏳ URL expiration
* 📊 Advanced analytics dashboard
* 🌍 Geographic analytics
* 💻 Browser/device analytics
* 🗑️ URL management and deletion
* 🛡️ Rate limiting
* 🚫 Malicious URL detection
* 📈 More detailed usage statistics

---

## 💼 Contact

**Deepak N**

B.Tech Information Technology

* **Project:** [Shrinkify](https://shrinkify-seven.vercel.app/)
* **GitHub:** [Deepak-132006](https://github.com/Deepak-132006)

---

## ⭐ Project

If you find Shrinkify useful or interesting, consider giving the repository a ⭐ on GitHub.
