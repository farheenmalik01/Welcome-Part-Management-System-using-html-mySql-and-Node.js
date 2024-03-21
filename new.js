const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express();

var connection = require ('./database')

app.use(bodyParser.urlencoded({ extended: true }));

/*app.get('/createDatabase',function(req,res) 
{                                                               
    let sql = "CREATE DATABASE Welcome";
    connection.query(sql,function(err,results)
    {
        if (err) throw err;  
        res.send(results);
    });

});*/


app.get('/', async(req, res) => 
{
    res.sendFile(path.join(__dirname, 'test4.html'));
});

app.get('/portalpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'portalpage.html'));
});

app.get('/user_login_signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'user_login_signup.html'));
});

app.get('/only_userlogin', (req, res) => {
  res.sendFile(path.join(__dirname, 'only_userlogin.html'));
});


app.get('/student_registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'student_registration.html'));
});




app.get('/student_registration.html', (req, res) => {
  const { UserID, username, password, age, noOfFamily, DietaryPreferences } = req.query;

  
  const sql = `INSERT INTO Student (UserID, username, password, age, noOfFamily, DietaryPreferences) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [UserID, username, password, age, noOfFamily, DietaryPreferences], (err, result) => {
    if (err) throw err;
    res.send(result);
  });


  res.send(`Student Registration Successful`);
});

app.get('/teacher_login_signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'teacher_login_signup.html'));
});

app.get('/teacher_registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'teacher_registration.html'));
});


app.get('/teacher_registration.html', (req, res) => {
  const { TeacherID, username, password, noOfFamily } = req.query;

  
  const sql = `INSERT INTO Teacher (TeacherID, username, password, noOfFamily) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [TeacherID, username, password, noOfFamily], (err, result) => {
    if (err) throw err;
    res.send(result);
  });


  res.send(`Teacher Registration Successful`);
});




app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});


app.get('/login.html', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM Student WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (err, result) => {
      if (err) {
          console.error('Error querying database: ', err);
          res.status(500).send('Error logging in');
      } else {
          if (username == 'SELECT * FROM Student WHERE username = ?' && password == 'SELECT * FROM Student WHERE password = ?') {
              // Successful login
              res.send('Login successful');
          } else {
              // Incorrect username or password
              res.send('Login failed');
          }
      }
  });
  res.send('Login successful');
});

app.get('/teacher_login', (req, res) => {
  res.sendFile(path.join(__dirname, 'teacher_login.html'));
});


app.get('/teacher_login.html', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM Teacher WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (err, result) => {
      if (err) {
          console.error('Error querying database: ', err);
          res.status(500).send('Error logging in');
      } else {
          if (username == 'SELECT * FROM Teacher WHERE username = ?' && password == 'SELECT * FROM Teacher WHERE password = ?') {
              // Successful login
              res.send('Login successful');
          } else {
              // Incorrect username or password
              res.send('Login failed');
          }
      }
  });
  res.send('Login successful');
});


app.get('/Performance', (req, res) => {
  res.sendFile(__dirname + '/Performance.html');
});

app.get('/performance_form', (req, res) => {
  res.sendFile(__dirname + '/performance_form.html');
});

app.get('/performance_form.html', (req, res) => {
  const { studentId, performanceType, duration, specialRequirements } = req.query;

  const sql = insertProposalQuery = `
    INSERT INTO PerformanceProposal (studentId, performanceType, duration, specialRequirements, votes)
    VALUES (?, ?, ?, ?, 0)
  `;


  connection.query(sql, [studentId, performanceType, duration, specialRequirements, votes], (err, result) => {
    if (err) throw err;
    res.send(result);
  });


  res.send(`Successful`);
});



app.get('/menu_items', (req, res) => {
  res.sendFile(__dirname + '/menu_items.html');
});

app.get('/Menu_Management', (req, res) => {
  res.sendFile(__dirname + '/Menu_Management.html');
});

app.get('/logout', (req, res) => {
  res.sendFile(__dirname + '/logout.html');
});

app.get('/attendance', (req, res) => {
  res.sendFile(__dirname + '/attendance.html');
});

app.get('/suggest_menu', (req, res) => {
  res.sendFile(__dirname + '/suggest_menu.html');
});

app.get('/tasks', (req, res) => {
  res.sendFile(__dirname + '/tasks.html');
});




app.get('/Menu', (req, res) => {
  res.sendFile(__dirname + '/Menu.html');
});

app.get('/Menu.html', (req, res) => {
  const sql = 'SELECT * FROM DinnerMenu';

  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching menu data:', err);
          res.status(500).json({ error: 'Error fetching menu data' });
      } else {
          res.json(result);
      }
  });
});

app.get('/suggest_menu', async(req, res) => 
{
    res.sendFile(path.join(__dirname, 'suggest_menu.html'));
});

// Handle the suggestion process
app.get('/suggest_menu.html', (req, res) => {
  const { StudentID, Item } = req.query;

  // Check if the student has already suggested a menu item
  const checkIfAlreadySuggested = 'SELECT * FROM MenuSuggestion WHERE StudentID = ?';
  connection.query(checkIfAlreadySuggested, [StudentID], (err, result) => {
      if (err) {
          console.error('Error checking existing suggestion:', err);
          res.status(500).send('Error suggesting menu item');
      } else {
          if (result.length > 0) {
              res.send('You have already suggested a menu item.');
          } else {
              // Insert the new menu suggestion
              const insertSuggestion = 'INSERT INTO MenuSuggestion (StudentID, Item, Votes) VALUES (?, ?, 0)';
              connection.query(insertSuggestion, [StudentID, Item], (err, result) => {
                  if (err) {
                      console.error('Error suggesting menu item:', err);
                      res.status(500).send('Error suggesting menu item');
                  } else {
                      res.send('Menu suggestion successful');
                  }
              });
          }
      }
  });
});

// Handle the voting process for menu suggestions
app.get('/vote_menu', (req, res) => {
  const { MenuSuggestionID } = req.query;

  // Update the votes count for the selected menu suggestion
  const voteQuery = 'UPDATE MenuSuggestion SET Votes = Votes + 1 WHERE MenuSuggestionID = ?';
  connection.query(voteQuery, [MenuSuggestionID], (err, result) => {
      if (err) {
          console.error('Error voting for menu suggestion:', err);
          res.status(500).send('Error voting for menu suggestion');
      } else {
          res.send('Vote successful');
      }
  });
});



/*app.get('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication logic here (replace this with your actual authentication logic)
  if (username === 'user' && password === 'pass') {
      res.send('Login successful!');
  } else {
      res.send('Login failed. Incorrect username or password.');
  }
});*/

const port = process.env.PORT || 3000;
app.listen(port, function()
{                          
    console.log(`Listening on port ${port}...`);   
    connection.connect(function(err) 
    {                
        if (err) throw err;  
        console.log("Connected!");  
    });
});


/*app.get('/test4.html', async(req, res) => 
{
    res.sendFile(path.join(__dirname, 'test4.html'));
});*/

/*
app.get('/Login.html', async(req, res) => 
{
    res.sendFile(path.join(__dirname, 'Login.html'));
});*/

/*app.get('/student_registration.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'student_registration.html'));
  });
  
  app.get('/student_registration', (req, res) => {
    const { UserID, username, password, RegistrationStatus } = req.query;

    
    const sql = `INSERT INTO Student (UserID, username, password, RegistrationStatus) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [UserID, username, password, RegistrationStatus], (err, result) => {
      if (err) {
        console.error('Error inserting data into table: ', err);
        res.status(500).send('Error signing up');
      } else {
        res.send('Authentication True'); 
      }
    });
  });*/


/*
app.post('/login', (req, res) => 
{
    const { username, password } = req.body;
  
    const sql = `SELECT * FROM Person WHERE username = ?`;
    connection.query(sql, [username], (err, results) => 
    {
      if (err) 
      {
        console.error('Error fetching user data: ', err);
        res.status(500).send('Error during authentication');
      } 

      else 
      {
        if (results.length === 0) 
        {
          res.send('Authentication False: User not found');
        } 

        else 
        {
          const user = results[0];
          if (user.password == password) 
          {
            res.send('Authentication True: User authenticated');
          } 

          else 
          {
            res.send('Authentication False: Incorrect password');
          }
        }
      }
    });
});*/

/*
app.get('/forgotPassword.html', (req, res) => 
{
  res.sendFile(path.join(__dirname, 'forgotPassword.html'))
});

app.post('/forgotPassword', (req, res) => {
  const { username, password } = req.body;

  const sql = `UPDATE Person SET password = ? WHERE username = ?`;
  connection.query(sql, [password, username], (err, results) => 
  {
   
    if (err) 
    {
      console.error('Error updating password: ', updateErr);
      res.status(500).send('Error during forget password process');
    } 
          
    else 
    {
      res.send('Password updated!')
    }
  });
  
});*/
