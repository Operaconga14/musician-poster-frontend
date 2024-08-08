// export class User {
//     id: any;
//     name = '';
//     email = '';
//     picture = '';
//     tel = '';
//     username = '';
//     role = '';

//     constructor(data: any) {
//         Object.assign(this, data)
//     }
// }

export interface User {
    id: any;
    name: string;
    email: string;
    picture: string;
    tel: string;
    username: string;
    role: string;
}
