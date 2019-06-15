export class Usuario {

    constructor(name: string, email: string, username: string, role:string, password: string) {
      this.name = name;
      this.email = email;
      this.username = username;
      this.password = password;
      this.role = [role];

    }
  
    name: string;
    email: string;
    username: string;
    password: string;
    role: string[];
  }