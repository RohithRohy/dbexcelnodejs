const mysql = require('mysql2')
const xlsx = require('xlsx')
//const workbook = XLSX.readFile('employee.xlsx'); // Replace 'example.xlsx' 
//const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'payrup',
    database:"dbexcel"
})

let workbook = xlsx.readFile('employee.xlsx')
let worksheet = workbook.Sheets[workbook.SheetNames[0]]
let range = xlsx.utils.decode_range(worksheet["!ref"])

for(let row = range.s.r;row<=range.e.r;row++){
    let data = []

    for(let col = range.s.c;col<=range.e.c;col++){
        let cell = worksheet[xlsx.utils.encode_cell({r:row,c:col})]
        data.push(cell.v)
    }
    console.log(data)

    let sql = "INSERT INTO `projectexcel` (`Name`,`Age`,`Country`) VALUES(?,?,?)"

    db.query(sql,data,(err,results,fields) => {
        if(err){
            return console.error(err.message)
        }
        console.log('ID:' + results.insertId)
    })
}

db.end()



