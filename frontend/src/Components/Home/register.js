const React = require('react');
const { useState } = require('react');
const styled = require('styled-components').default;
const { useGlobalContext } = require('../../context/globalContext');

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: ''
  });
  const { registerUser } = useGlobalContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  return (
    React.createElement(RegisterStyled, null,
      React.createElement('h1', null, 'Register'),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('input', {
          type: 'text',
          name: 'name',
          placeholder: 'Name',
          value: formData.name,
          onChange: handleChange
        }),
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
        React.createElement('input', {
          type: 'text',
          name: 'phone',
          placeholder: 'Phone',
          value: formData.phone,
          onChange: handleChange
        }),
        React.createElement('input', {
          type: 'text',
          name: 'address',
          placeholder: 'Address',
          value: formData.address,
          onChange: handleChange
        }),
        React.createElement('input', {
          type: 'text',
          name: 'answer',
          placeholder: 'Security Answer',
          value: formData.answer,
          onChange: handleChange
        }),
        React.createElement('button', { type: 'submit' }, 'Register')
      )
    )
  );
}

const RegisterStyled = styled.div`
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

export default Register;
