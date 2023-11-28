db.createCollection("articles");

//Registros base/modelo

db.articles.insert({
  "kb_title": "Sample Article",
  "kb_body": "This is a sample article body.",
  "kb_permalink": "sample-article",
  "kb_keywords": "sample, article",
  "kb_liked_count": 0,
  "kb_published": true,
  "kb_suggestion": false,
  "kb_featured": true,
  "kb_author_email": "sample@example.com",
  "kb_published_date": new Date()
});

db.createCollection("users");

db.users.insert({
  "_id": ObjectId(),
  "author_name": "Andre Faria Ruaro",
  "author_email": "andre.ruaro@unesc.net",
  "author_user": "andre.ruaro",
  "author_pwd": "7a6cc1282c5f6ec0235acd2bfa780145aaskem5n",
  "author_level": "admin",
  "author_status": "on",
  "author_create_data": ISODate("2023-08-30")
});
