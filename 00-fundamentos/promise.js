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

let getSalary = (id, objs) => {
        return new Promise((resolve, reject) => {

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

                reject(`User with id: ${id } not found`, null);
            } else {
                return resolve({
                    user: respList[0].name,
                    salary: respList[1].salary,
                    id: respList[1].id
                });
            }
        })
    }
    // getSalary(1, [users, salary]).then(
    //         employ => {
    //             console.log(employ);
    //         }, (err) => {
    //             console.log(err);
    //         }
    //     )
    // promise chain 
getSalary(1, [users, salary]).then(
    employ => {
        console.log(employ);
        return getSalary(3, [users, salary]);
    }, (err) => {
        console.log(err);
    }
).then(resp =>
    console.log(resp)
).catch(err => console.log(err));