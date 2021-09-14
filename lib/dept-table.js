//create table

app.get('createDeptTable'(req, res) => {
    let sql = 'CREATE TABLE dept(dept_id int AUTO INCREMENT PRIMARY KEY, dept_name VARCHAR(30), PRIMARY KEY(id))',
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Department table created...");
        });
});

//Insert post 1
app.get('/adddept1', (req, res) => {
    let dept = {
        title: 'Department Id',
        body: 'Department Name',
    };
    let sql = 'INSERT INTO dept SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Department 1 added");
    });
});

//select posts
app.get('/getdept', (req, res) => {
    let sql = 'SELECT * FROM dept';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Departments fetched...");
    });
});

//select single posts
app.get('/getdept/:id', (req, res) => {
    let sql = `SELECT * FROM dept WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Department fetched...");
    });
});

//update post 
app.get('/updatedept/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `UPDATE dept SET title = ${newTitle} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Department updated...");
    });
});

//delete post 
app.get('/deletedept/:id', (req, res) => {
    let sql = `DELETE FROM dept WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Department deleted...");
    });
});