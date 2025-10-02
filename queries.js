// queries.js
// Node.js version of all MongoDB queries in CommonJS format

const { connectDB, mongoose } = require('./mongodb_connection');
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    published_year: Number,
    genre: String,
    price: Number,
    in_stock: Boolean // Assuming these fields exist
}, { collection: 'books' });

const books = mongoose.model('Book', BookSchema);
let client = null; // Variable to hold the connection object for closing

async function runQueries() {
    try {
        // connectDB should establish the Mongoose connection
        client = await connectDB(); 

        console.log("\n TASK 2: BASIC QUERIES ");
        // 1. Find all books in a specific genre
        console.log("1. Books in Fantasy genre:");
        // Using Mongoose Model syntax (replace .toArray() with .lean() for plain JS objects)
        const fantasyBooks = await books.find({ genre: "Fantasy" }).lean();
        console.log(JSON.stringify(fantasyBooks, null, 2));

        // 2. Find books published after 2000
        console.log("\n2. Books published after 2000:");
        const recentBooks = await books.find({ published_year: { $gt: 2000 } }).lean();
        console.log(JSON.stringify(recentBooks, null, 2));

        // 3. Find books by specific author
        console.log("\n3. Books by J.R.R. Tolkien:");
        const tolkienBooks = await books.find({ author: "J.R.R. Tolkien" }).lean();
        console.log(JSON.stringify(tolkienBooks, null, 2));

        // 4. Update price of specific book
        console.log("\n4. Updating price of 'The Great Gatsby':");
        const updateResult = await books.updateOne(
            { title: "The Great Gatsby" },
            { $set: { price: 99.99 } }
        );
        console.log(`Modified ${updateResult.modifiedCount} document(s)`);
        const updatedBook = await books.findOne({ title: "The Great Gatsby" }).lean();
        console.log("Updated book:", JSON.stringify(updatedBook, null, 2));

        // 5. Delete a book by title
        console.log("\n5. Deleting 'Pride and Prejudice':");
        const deleteResult = await books.deleteOne({ title: "Pride and Prejudice" });
        console.log(`Deleted ${deleteResult.deletedCount} document(s)`);
        const remainingCount = await books.countDocuments();
        console.log(`Remaining books: ${remainingCount}`);


        console.log("\nTASK 3: ADVANCED QUERIES");
        // 1. Books in stock AND published after 2010
        console.log("1. Books in stock AND published after 2010:");
        const inStockRecent = await books.find({
            in_stock: true,
            published_year: { $gt: 2010 }
        }).lean();
        console.log(JSON.stringify(inStockRecent, null, 2));

        // 2. Projection that returns only title, author, price
        console.log("\n2. All books (title, author, price only):");
        const projection = await books.find(
            {},
            { title: 1, author: 1, price: 1, _id: 0 }
        ).lean();
        console.log(JSON.stringify(projection, null, 2));

        // 3a. Sort by price ascending
        console.log("\n3a. Books sorted by price (ascending):");
        const sortedAsc = await books.find(
            {},
            { title: 1, price: 1, _id: 0 }
        ).sort({ price: 1 }).lean();
        console.log(JSON.stringify(sortedAsc, null, 2));

        // 3b. Sort by price descending
        console.log("\n3b. Books sorted by price (descending):");
        const sortedDesc = await books.find(
            {},
            { title: 1, price: 1, _id: 0 }
        ).sort({ price: -1 }).lean();
        console.log(JSON.stringify(sortedDesc, null, 2));

        // 4. Pagination
        console.log("\n4. Pagination (5 books per page):");
        console.log("\nPage 1:");
        const page1 = await books.find({}, { title: 1, author: 1, _id: 0 })
            .limit(5).lean();
        console.log(JSON.stringify(page1, null, 2));

        console.log("\nPage 2:");
        const page2 = await books.find({}, { title: 1, author: 1, _id: 0 })
            .skip(5).limit(5).lean();
        console.log(JSON.stringify(page2, null, 2));


        console.log("\n TASK 4: AGGREGATION PIPELINE ");
        
        // 1. Average price by genre
        console.log("1. Average price by genre:");
        const avgByGenre = await books.aggregate([
            { $group: {
                _id: "$genre",
                averagePrice: { $avg: "$price" },
                bookCount: { $sum: 1 }
            }},
            { $sort: { averagePrice: -1 }},
            { $project: {
                genre: "$_id",
                averagePrice: { $round: ["$averagePrice", 2] },
                bookCount: 1,
                _id: 0
            }}
        ]);
        console.log(JSON.stringify(avgByGenre, null, 2));

        // 2. Author with most books
        console.log("\n2. Author with most books:");
        const topAuthor = await books.aggregate([
            { $group: {
                _id: "$author",
                bookCount: { $sum: 1 },
                books: { $push: "$title" }
            }},
            { $sort: { bookCount: -1 }},
            { $limit: 1 },
            { $project: {
                author: "$_id",
                bookCount: 1,
                books: 1,
                _id: 0
            }}
        ]);
        console.log(JSON.stringify(topAuthor, null, 2));

        // 3. Books grouped by decade
        console.log("\n3. Books grouped by publication decade:");
        const byDecade = await books.aggregate([
            { $addFields: {
                decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }
            }},
            { $group: {
                _id: "$decade",
                count: { $sum: 1 },
                books: { $push: { title: "$title", year: "$published_year" } }
            }},
            { $sort: { _id: 1 }},
            { $project: {
                decade: "$_id",
                count: 1,
                books: 1,
                _id: 0
            }}
        ]);
        console.log(JSON.stringify(byDecade, null, 2));


        console.log("\n TASK 5: INDEXING ");
      
        // 1. Create index on title
        console.log("1. Creating index on 'title':");
        await books.createIndexes({ title: 1 }); 
        console.log("Index created on title field");
        
        // 2. Create compound index
        console.log("\n2. Creating compound index on 'author' and 'published_year':");
        await books.createIndexes({ author: 1, published_year: -1 }); 
        console.log("Compound index created");
        
        // 3. Explain query performance
        console.log("\n4. Query performance with explain:");
        const explainResult = await books.find({ title: "The Hobbit" }).explain("executionStats");
        console.log("Execution stats:");
        console.log(`- Execution time: ${explainResult.executionStats.executionTimeMillis}ms`);
        console.log(`- Documents examined: ${explainResult.executionStats.totalDocsExamined}`);
        console.log(`- Documents returned: ${explainResult.executionStats.nReturned}`);
      
        // Use mongoose.connection.close() to close the connection
        if (mongoose.connection.readyState === 1) { 
            await mongoose.connection.close();
            console.log("\nConnection closed");
        }
    } catch (error) {
        console.error("Error running queries:", error);
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log("\nConnection closed due to error");
        }
    }
}

runQueries();