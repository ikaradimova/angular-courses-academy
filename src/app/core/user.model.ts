import {Role} from "./role.model";

export class FirebaseUserModel {
  image: string;
  username: string;
  provider: string;
  role: Role;

  constructor(){
    this.image = "";
    this.username = "";
    this.provider = "";
  }
}
