import './App.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        <header className="App-header">
          <GoogleLogin
            buttonText="Login"
            onSuccess={(response) => {
              fetch('http://localhost:3000/auth/google-authentication', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: response.credential }),
              })
                .then((res) => console.log(res))
                .then((data) => console.log(data));
            }}
          />
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
