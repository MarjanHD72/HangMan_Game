export class userAuthentication {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("Users")) || [];
    this.loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser")) || null;
  }

  // registration of users
  register(userData) {
    this.users.push(userData);
    localStorage.setItem("Users", JSON.stringify(this.users));
  }
  // user LogIn
  logIn(userNameOrEmail, password) {
    const user = this.users.find(
      (u) =>
        (u.username === userNameOrEmail || u.email === userNameOrEmail) &&
        u.password === password
    );
    if (user) {
      this.loggedInUser = user;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      return true;
    } else {
      return false;
    }
  }
  //user log out
  logOut() {
    this.loggedInUser = null;
    localStorage.removeItem("loggedInUser");
    localStorage.setItem("isLoggedIn", "false");
  }
  //   Check if user is logged in
  isLoggedIn() {
    return this.loggedInUser !== null;
    
  }
  getUser() {
    return (
      this.loggedInUser ||
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      null
    );
  }
}
