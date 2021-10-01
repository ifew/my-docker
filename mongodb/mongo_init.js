//create the madMen database and connect to it
var db = connect('127.0.0.1:27017/admin'),
    gowDB = null;
db.auth("admin", "sck@1711" )
use gow
// creation of the replica set admin user
db.createUser(
  {
    "user" : "gow:",
    "pwd" : "sck@1711",
    roles: [ { "role" : "dbAdmin", "db" : "gow" } ]
  }
)

db.clients.insert(
    {
        "title_th": "สมเกียรติวิทยา",
        "branch_th": "สาขาสำนั กงานใหญ่",
        "address_th": "ลาดพร้ าว",
        "taxid": "0 - 2435 - 99999 - 15 - 0 "

    }
 )

 db.clients.insert(
    {
        "title_th": "สมเกียรติวิทยา",
        "branch_th": "สาขาสำนั กงานใหญ่",
        "address_th": "ลาดพร้ าว",
        "taxid": "0 - 2435 - 99999 - 15 - 0 "

    }
 )