import bcrypt from 'bcrypt';
import db from '../Database/db.js'

export const registerUser=async(req, res)=>{
    try {
        console.log(req.body);
        const user = req.body;
        const hashPassword = await bcrypt.hash(user.password, 10);
        const email = user.email;
        const username = user.username;

        

        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const values = [username, email, hashPassword];

        db.query(sql, values, (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).json({ message: 'Error registering user' });
            }
            console.log('Query results:', results);
            return res.status(200).json({ message: 'Successfully registered' });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const loginUser = async(req, res)=>{
    try {
        console.log(req.body);
        const user = req.body;
        const email = user.email;

        const sql = 'SELECT password FROM users WHERE email = ?';
        db.query(sql, [email], async (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).json({ message: 'Error fetching user' });
            }
            try {
                const match = await bcrypt.compare(user.password, results[0].password);
                if (match) {
                    res.status(200).send('Login successful');
                } else {
                    res.status(401).send('Incorrect password');
                }
                console.log('Query results:', results);
            } catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


