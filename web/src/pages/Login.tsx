import { useState } from 'react';
import styles from './Login.module.css'; 
import loginImage from './img/login_img.png'
import eyeOpen from './img/olho_aberto.svg';
import eyeClosed from './img/olho_fechado.svg';
import { api } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false); 
    
    try {
      const response = await api.post('/login', {
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('@uTask:token', token);
      localStorage.setItem('@uTask:user', JSON.stringify(user));

      navigate('/kanban');

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setLoginError(true);
    }
  };

  return (
    <>
    <div className={styles.topBar}></div>
    
    <div className={styles.loginContainer}> 
      <div className={styles.imageSection}>
            <img src={loginImage} alt="pessoas organizando tarefas" className={styles.loginImagem}/>
        </div>

        <div className={styles.verticalDivider}></div>

        <div className={styles.rightSection}>
      <h1 className={styles.logo}>uTask 3.0</h1>
      
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Endereço de e-mail"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <div className={styles.passwordWrapper}>
          <input 
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha secreta"
            className={loginError ? styles.inputError : ''}
            required
          />

            <button
                type="button" 
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
            >
                <img src={showPassword ? eyeOpen : eyeClosed} alt={showPassword ? "esconder senha" : "mostrar senha"}/>
            </button>
        </div>
        {loginError && <span className={styles.errorMessage}>Senha incorreta, tente novamente.</span>}
        <Link to="/esqueceu-senha" className={styles.forgotPassword}>Esqueceu a senha ?</Link>
        </div>

        <button type="submit" className={styles.submitBtn}>Entrar</button>
      </form>

        <div className={styles.horizontalDivider}></div>

      <p className={styles.registerText}><Link to="/register">Não tem cadastro ? Crie uma conta</Link></p>
    </div>

    </div>
    </>
  );
}