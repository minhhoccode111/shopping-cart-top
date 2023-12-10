import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>This is Login element</h1>
      <section>
        <button onClick={() => navigate(-1)}>go back</button>
      </section>
    </>
  );
};

export default Login;
