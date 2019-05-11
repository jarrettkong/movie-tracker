import React, { Component } from 'react';
import { login, logout } from '../../actions';
import { connect } from 'react-redux';

class Login extends Component {
	state = {
		name: '',
		email: '',
		password: ''
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { name, email, password } = this.state;
    let body;
    let dir = '';

		if (this.props.type === 'Log In') {
			body = { email, password };
		} else {
      body = { name, email, password };
      dir = 'new';
		}
		this.fetchUser(body, dir);
	};

  fetchUser = async (body, dir) => {
    console.log(body, dir)
		try {
			const res = await fetch(`http://localhost:3000/api/users/${dir}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
      const result = await res.json();
      console.log(result)
      this.logIn(result, dir, body);

		} catch (err) {
			console.log(err.status, err.message);
		}
  };
  
  logIn = (result, dir, body) => {
    dir !== 'new' ? this.props.login(result.data)
      : this.fetchUser({ email: body.email, password: body.password }, '');
    
    this.setState({ name: '', email: '', password: '' });
  }

  render() {
    const name = this.props.type !== 'Log In' &&
      <>
        <label htmlFor="user-name" />
        <input
          className="detail-input"
          name="name"
          placeholder="name"
          value={this.state.name}
          id="user-name"
          onChange={this.handleChange}
        />
      </>
    
		return (
			<div className="popup">
        <div className="dialog">
          <i className='fas fa-times popup-close-btn' onClick={this.props.closeUserForm}></i>
          <h3 className="dialog-header">{this.props.type}</h3>
          <form className="user-form" onSubmit={this.handleSubmit}>
            <h4 className="form-header">Enter your details:</h4>
						<label htmlFor="user-email" />
            {name}
            <input
              className="detail-input"
							type="email"
							name="email"
							placeholder="email"
							value={this.state.email}
							id="user-email"
							onChange={this.handleChange}
						/>
						<label htmlFor="user-password" />
						<input
              className="detail-input"
							type="password"
							name="password"
							placeholder="password"
							value={this.state.password}
							id="user-password"
							onChange={this.handleChange}
						/>
						<input className="login-form-btn" type="submit" value={this.props.type} />
					</form>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = state => ({ user: state.user });

export const mapDispatchToProps = dispatch => {
	return {
		login: user => dispatch(login(user)),
		logout: () => dispatch(logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);