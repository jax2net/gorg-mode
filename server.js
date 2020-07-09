const express = require('express');
const cors = require('cors');
const pool = require('./connect');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(bodyParser.text());

app.get('/', (req, res) => {
    try {
       res.send('main');
    } catch (err) {
       console.log(err.message);
    }
});

// get all orgs
app.get('/orgs', async (req, res) => {
    try {
       const orgs = await pool.query(
          "SELECT * FROM orgs"
       ); 
       res.json(orgs.rows);
    } catch (err) {
       console.log(err.message); 
    }
});

// get a specific org
app.get('/orgs/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const selectedOrg = await pool.query(
         "SELECT * FROM orgs WHERE id = $1", [id]
      );
      res.json(selectedOrg.rows[0].body);
      
   } catch (err) {
      console.log(err.message);
      
   }
})

// create a new org
app.post('/orgs', async (req, res) => {
   try {
      const newPost = req.body;
      const orgified = parser(newPost);
      await pool.query(
         "INSERT INTO orgs (body) VALUES ($1)", [orgified]
      );
      res.json({ msg: 'Post inserted.'});
   } catch (error) {
      console.log(error.message);   
   }
})

app.delete('/orgs/:id', async (req, res) => {
   try {
      const { id } = req.params;
      await pool.query(
         "DELETE FROM orgs WHERE id = $1", [id]
      );
      res.json({ msg: `Deleted post with an id of ${id}`});
   } catch (err) {
      console.log(err.message);
   }
});

app.put('/orgs/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const { body } = req;
      const orgified = parser(body);
      await pool.query(
         "UPDATE orgs SET body = $1 WHERE id = $2", [orgified, id]
      );
      res.json({ msg: `Updated post of id ${id}`});
   } catch (err) {
      console.log(err.message);
   }
});

// create user
app.post('/register', async (req, res) => {
   try {
      const username = req.body.username;
      const salt = await bcrypt.genSalt();
      const hashedPw = await bcrypt.hash(req.body.password, salt);
      await pool.query(
         'INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPw]
      );
      res.json({ msg: 'Created new user' });
   } catch (err) {
      console.log(err.message);
   }
});

app.post('/login', async (req, res) => {
   const usernameRequest = req.body.username;
   const passwordRequest = req.body.password;
   try {
      const passwordSearch = await pool.query(
         'select password from users where username = $1', [usernameRequest]
      );
      console.log(passwordSearch);
      if (await bcrypt.compare(passwordRequest, passwordSearch.rows[0].password)) {
         res.send('Success');
      } else {
         res.send('Access denied');
      }
   } catch (err) {
      console.log(err.message);
   }
});

app.get('/users', async (req, res) => {
   try {
      const users = await pool.query(
         'select * from users'
      );
      res.send(users);
   } catch (err) {
      console.log(err);
   }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));


// handles conversion from orgmode text to HTML
const Org = require('org');
const orgParser = new Org.Parser();
const parser = (input) => {
    var orgDocument = orgParser.parse(input);
    var orgHTMLDocument = orgDocument.convert(Org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false
    });
    return orgHTMLDocument.toString();
};