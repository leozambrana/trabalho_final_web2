const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "chave_secreta_hihihi_eu_tenho_um_segredo",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB:"));
db.once("open", () => {
  console.log("Conectado ao MongoDB");
});

const articleSchema = new mongoose.Schema({
  kb_title: String,
  kb_body: String,
  kb_permalink: String,
  kb_keywords: String,
  kb_liked_count: Number,
  kb_published: Boolean,
  kb_suggestion: Boolean,
  kb_featured: Boolean,
  kb_author_email: String,
  kb_published_date: Date,
});

const Article = mongoose.model("Article", articleSchema);

const userSchema = new mongoose.Schema({
  author_name: String,
  author_email: String,
  author_user: String,
  author_pwd: String,
  author_level: String,
  author_status: String,
  author_create_data: Date,
});

const User = mongoose.model("User", userSchema);

const authenticateUser = (req, res, next) => {

  if (true || req.session && req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ message: "Não autorizado" });
  }
};

app.post("/login", async (req, res) => {
  try {
    const author_user = req.body.username;
    const author_pwd = req.body.password;

    const user = await User.findOne({ author_user:author_user, author_pwd:author_pwd });
    if (user) {
      req.session.authenticated = true;
      req.session.save();

      res.json({ message: "Login bem-sucedido" });
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res, next) => {
  if (req.path !== "/login") {
    authenticateUser(req, res, next);
  } else {
    next();
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {

    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Artigo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/articles/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      const like = req.body.like;
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { $inc: { kb_liked_count: like } },
      );
      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.post("/articles", async (req, res) => {
  try {
    const article = new Article(req.body);

    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.json({ message: "Artigo excluído com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
