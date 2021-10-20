export class User {
    id: string;
    username: string;
    email: string;
    faculty: string;
    password: string;
    roles: string[];


    constructor(id: string, username: string, email: string, faculty: string, password: string, roles: string[]) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.faculty = faculty;
        this.password = password;
        this.roles = roles;
    }
}
