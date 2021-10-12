 export class User {
  id: number;
   username: string;
   password: string;
   firstName: string;
   lastName: string;
   role: string;
   faculty: string;
   token?: string;


   constructor(id: number, username: string, password: string, firstName: string, lastName: string, role: string, faculty: string, token: string) {
     this.id = id;
     this.username = username;
     this.password = password;
     this.firstName = firstName;
     this.lastName = lastName;
     this.role = role;
     this.faculty = faculty;
     this.token = token;
   }
 }
