//create table
app.get('createRoleTable'(req, res) => {
    let sql = 'CREATE TABLE role(role_title VARCHAR(30), role_id int AUTO INCREMENT PRIMARY KEY, dept_name VARCHAR(30), role_salary DECIMAL (10) DEFAULT NULL, PRIMARY KEY(id))',
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("role table created...");
        });
});

//Insert post 1
app.get('/addrole1', (req, res) => {
    let role = {
        title: 'role Id',
        body: 'role Name',
    };
    let sql = 'INSERT INTO role SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("role 1 added");
    });
});

//select posts
app.get('/getrole', (req, res) => {
    let sql = 'SELECT * FROM emprole JOIN department ON emprole.dept_id = department.dept_id';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("roles fetched...");
    });
});

//select single posts
app.get('/getrole/:id', (req, res) => {
    let sql = `SELECT * FROM role WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("role fetched...");
    });
});

//update post 
app.get('/updaterole/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `UPDATE role SET title = ${newTitle} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("role updated...");
    });
});

//delete post 
app.get('/deleterole/:id', (req, res) => {
    let sql = `DELETE FROM role WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("role deleted...");
    });
});