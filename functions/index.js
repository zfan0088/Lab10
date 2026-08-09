const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.countBooks = onRequest({cors: true}, async (req, res) => {
  try {
    const booksCollection = admin.firestore().collection("books");
    const snapshot = await booksCollection.get();
    const count = snapshot.size;

    res.status(200).send({count});
  } catch (error) {
    res.status(500).send("Error counting books");
  }
});

exports.bookStore = onRequest({cors: true}, async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("books").get();
    const books = snapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        isbn: data.isbn,
        price: Number((9.99 + index * 2.5).toFixed(2)),
        message: `Buy ${data.name} today from NoMash Library`
      };
    });

    res.status(200).send({
      success: true,
      total: books.length,
      books
    });
  } catch (error) {
    res.status(500).send("Error loading book store");
  }
});
