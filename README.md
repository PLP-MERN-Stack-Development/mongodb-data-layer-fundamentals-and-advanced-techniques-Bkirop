# MongoDB – Data Layer Fundamentals and Advanced Techniques 📚
## 🚀 Project Overview

This project demonstrates comprehensive MongoDB operations including CRUD operations, advanced queries, aggregation pipelines, and performance optimization through indexing. 

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Usage](#-usage)
- [Tasks Completed](#-tasks-completed)
- [Screenshots](#-screenshots)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)

## ✨ Features

- ✅ Complete CRUD (Create, Read, Update, Delete) operations
- ✅ Advanced filtering and projection queries
- ✅ Sorting and pagination implementation
- ✅ Aggregation pipelines for data analysis
- ✅ Index creation for performance optimization
- ✅ Connection to MongoDB Atlas cloud database
- ✅ Comprehensive query performance analysis

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)

### Optional Tools

- **MongoDB Compass** - GUI for MongoDB - [Download](https://www.mongodb.com/products/compass)
- **MongoDB Shell (mongosh)** - CLI tool - [Download](https://www.mongodb.com/try/download/shell)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-Bkirop.git
cd mongodb-data-layer-fundamentals-and-advanced-techniques-Bkirop
```

### 2. Install Dependencies

```bash
npm install
```

This will install the required `mongodb` package.

### 3. Configure MongoDB Connection

Update the connection string in both `insert_books.js` and `queries.js`:

```javascript
const uri = "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE";
```

**Get your connection string from:**
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

## 📁 Project Structure

```
mongodb-bookstore/
│
├── node_modules/           # Dependencies (auto-generated)
├── screenshot/             # Screenshots folder
│   └── database-view.png   # Database screenshot
│
├── insert_books.js         # Script to populate database
├── queries.js              # All MongoDB queries
├── mongodb_connection.js   # Connection test script
├── package.json            # Project dependencies
├── package-lock.json       # Dependency lock file
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 📊 Database Schema

### Database Name: `plp_bookstore`
### Collection Name: `books`

#### Book Document Structure:

```javascript
{
  title: String,           // Book title
  author: String,          // Author name
  genre: String,           // Book genre
  published_year: Number,  // Year of publication
  price: Number,          // Book price (in USD)
  in_stock: Boolean,      // Availability status
  pages: Number,          // Number of pages
  publisher: String       // Publisher name
}
```

#### Sample Document:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "published_year": 1925,
  "price": 12.99,
  "in_stock": true,
  "pages": 180,
  "publisher": "Scribner"
}
```

## 🎯 Usage

### Step 1: Insert Sample Data

Run the insert script to populate your database with 12 sample books:

```bash
node insert_books.js
```

**Expected Output:**
```
Connected successfully to MongoDB Atlas
Successfully inserted 12 books
Total books in collection: 12

First 3 books:
[... book details ...]

Connection closed
```

### Step 2: Run All Queries

Execute all tasks (CRUD, Advanced Queries, Aggregation, Indexing):

```bash
node queries.js
```

This script will:
- Perform all CRUD operations
- Execute advanced queries with filtering, projection, and sorting
- Run aggregation pipelines
- Create indexes and analyze performance
- Display comprehensive results for each operation

### Step 3: Using MongoDB Compass (Optional)

1. Open MongoDB Compass
2. Connect using your connection string
3. Navigate to `plp_bookstore` database
4. View the `books` collection
5. Run custom queries using the GUI

## ✅ Tasks Completed

### Task 1: MongoDB Setup ✓
- [x] MongoDB Atlas cluster configured
- [x] Database `plp_bookstore` created
- [x] Collection `books` created

### Task 2: Basic CRUD Operations ✓
- [x] Insert 12 books with all required fields
- [x] Find books by genre
- [x] Find books by publication year
- [x] Find books by author
- [x] Update book price
- [x] Delete book by title

### Task 3: Advanced Queries ✓
- [x] Complex filtering (in_stock AND published after 2010)
- [x] Projection (selecting specific fields)
- [x] Sorting (ascending and descending)
- [x] Pagination (5 books per page)

### Task 4: Aggregation Pipeline ✓
- [x] Average price by genre
- [x] Author with most books
- [x] Books grouped by decade

### Task 5: Indexing ✓
- [x] Single field index on `title`
- [x] Compound index on `author` and `published_year`
- [x] Performance analysis with `explain()`


## 📸 Screenshots

### Collection
![Collection](./screenshot/collections.png)

### Sample Data
![Sample Data](./screenshot/sample_data.png)

## 📄 License

This project is designed for learning purposes.

## 👨‍💻 Author

**Brian Kirop**
- GitHub: [@Bkirop](https://github.com/Bkirop)
- Project Link: [MongoDB Data Layer Fundamentals](https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-Bkirop)

## 🙏 Acknowledgments

- Power Learn Project (PLP) for the assignment structure
---
