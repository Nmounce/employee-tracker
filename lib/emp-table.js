//create table
emp id, first name, last name, job title, dept, salary, manager id
app.get('createEmpTable'(req, res) => {
    let sql = 'CREATE TABLE emp(emp_id int AUTO INCREMENT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), job_title VARCHAR(30), dept_id VARCHAR(30), salary PRIMARY KEY(id))',
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("employee table created...");
        });
});

//Insert post 1
app.get('/addemp1', (req, res) => {
    let emp = {
        title: 'employee Id',
        body: 'employee Name',
    };
    let sql = 'INSERT INTO emp SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("employee 1 added");
    });
});

//select posts
app.get('/getemp', (req, res) => {
    let sql = 'SELECT * FROM emp';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("employees fetched...");
    });
});

//select single posts
app.get('/getemp/:id', (req, res) => {
    let sql = `SELECT * FROM emp WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("employee fetched...");
    });
});

//update post 
app.get('/updateemp/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `UPDATE emp SET title = ${newTitle} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("employee updated...");
    });
});

//delete post 
app.get('/deleteemp/:id', (req, res) => {
    let sql = `DELETE FROM emp WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("employee deleted...");
    });
});