import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "./firebase";

class EmailRegister extends React.Component {
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
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        await auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            async (result) => {
                //3 - pick the result and store the token
                const token = await auth?.currentUser?.getIdToken(true);
                await auth?.currentUser?.sendEmailVerification();

                //4 - check if have token in the current user
                if (token) {
                    //5 - put the token at localStorage (We'll use this to make requests)
                    localStorage.setItem("@token", token);
                    //6 - navigate user to the book list
                    this.setState({
                        email: "",
                        password: ""
                    });
                    alert("Press on the verification link that we sent to you email address")
                    this.props.history.push("/login");
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
                    <h3>Register with email</h3>
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
                    <label htmlFor="password">Enter your password: </label>
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
                    <button type="submit">Register</button>
                </div>
            </form>
        )
    }
}

export default withRouter(EmailRegister);

