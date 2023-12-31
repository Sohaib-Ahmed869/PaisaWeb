import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BasicExample = ({ newEmail, confirmEmail, onEmailChange, onConfirmEmailChange, onUpdateEmail }) => {
  return (
    <Form onSubmit={onUpdateEmail}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Update Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={newEmail} onChange={onEmailChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="ReEnterPassword">
        <Form.Label>Re Enter Email Address</Form.Label>
        <Form.Control type='email' placeholder="Re Enter Email" value={confirmEmail} onChange={onConfirmEmailChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default BasicExample;