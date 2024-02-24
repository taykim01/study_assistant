export default class UserModel {
  createdAt: Date;
  email: string;
  password: string;

  constructor(createdAt: Date, email: string, password: string) {
    this.createdAt = createdAt;
    this.email = email;
    this.password = password;
  }

  toObject() {
    return {
      createdAt: this.createdAt,
      email: this.email,
      password: this.password,
    };
  }
}
