const React = require('react');
const { useState } = require('react');
const styled = require('styled-components').default;
const { useGlobalContext } = require('../../context/globalContext');

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { loginController } = useGlobalContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginController(formData);
  };

  return (
    React.createElement(LoginStyled, null,
      React.createElement('h1', null, 'Login'),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('input', {
          type: 'email',
          name: 'email',
          placeholder: 'Email',
          value: formData.email,
          onChange: handleChange
        }),
        React.createElement('input', {
          type: 'password',
          name: 'password',
          placeholder: 'Password',
          value: formData.password,
          onChange: handleChange
        }),
        React.createElement('button', { type: 'submit' }, 'Login')
      )
    )
  );
}

const LoginStyled = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 0.5rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

module.exports = Login;
