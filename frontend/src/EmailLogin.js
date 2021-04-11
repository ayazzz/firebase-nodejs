import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "./firebase";

class EmailLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        await auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(
            async (result) => {
                //3 - pick the result and store the token
                const token = await auth?.currentUser?.getIdToken(true);

                //4 - check if have token in the current user
                if (token) {
                    //5 - put the token at localStorage (We'll use this to make requests)
                    localStorage.setItem("@token", token);
                    //6 - navigate user to the book list
                    this.props.history.push("/book-list");
                }
            },
            function (error) {
                alert(error)
            }
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h3>Login with email</h3>
                </div>
                <div>
                    <label htmlFor="email">Enter your email: </label>
                    <br />
                    <input
                        name="email"
                        type="email"
                        placeholder="insert a valid email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="pwd">Enter your password: </label>
                    <br />
                    <input
                        name="password"
                        type="password"
                        placeholder="insert a password"
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        )
    }
}

export default withRouter(EmailLogin);

