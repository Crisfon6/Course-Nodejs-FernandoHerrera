let users = [{
        "name": 'cristhian',
        "id": 1
    },
    {
        "name": 'maria',
        "id": 2
    }, {
        "name": 'mariela',
        "id": 3
    }, {
        "name": 'wilfred',
        "id": 4
    }
];
let salary = [{
        "salary": 200,
        "id": 1
    },
    {
        "salary": 100,
        "id": 2
    }, {
        "salary": 1000,
        "id": 3
    }, {
        "salary": 201,
        "id": 4
    }
];

let getUser = (id, callback) => {
    let user = users.find((user) => user.id === id);
    if (!user) {
        callback(`The user with id : ${ id } not found `, null)
    } else { callback(null, user) }
}
let getSalary = (id, objs, callback) => {
    let respList = []
    let error = false
    objs.forEach((obj) => {
        let resp = obj.find((user) => user.id === id);
        if (!resp || error) {
            error = true
            return
        } else {
            respList.push(resp);
        }
    });
    if (error) {

        return callback(`User with id: ${id } not found`, null);
    } else {
        return callback(null, {
            user: respList[0].name,
            salary: respList[1].salary,
            id: respList[1].id
        });
    }

}
getSalary(4, [users, salary], (err, user) => {
    if (err) {
        return console.log(err);
    } else {
        return console.log(user);
    }
});
// getUser(10, (err, user) => {

//     if (err) {
//         return console.log(err);
//     } else {
//         return console.log(user);
//     }
// });