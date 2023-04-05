export const ListUsers = ({ data, clickName }) => {
  return (
    <ul>
      {data && data.map(user => (
        <li key={user.id} onClick={() => clickName(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}