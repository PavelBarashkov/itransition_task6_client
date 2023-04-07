import Toast from 'react-bootstrap/Toast';

export const BasicExample = ({ data, onClose }) => {
  return (
    <Toast 
      onClose={onClose}>
      <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{data.theme}</strong>
          <small>{data.createMessage}</small>
      </Toast.Header>
      <Toast.Body>{data.body}</Toast.Body>
    </Toast>
  );
}
