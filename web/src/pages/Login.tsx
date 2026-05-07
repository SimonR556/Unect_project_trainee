import { useState } from 'react';
import styles from './Login.module.css'; 
import loginImage from './img/login_img.png'
import eyeOpen from './img/olho_aberto.svg';
import eyeClosed from './img/olho_fechado.svg';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tentando logar com:', email, password); //teste para o back 
  };

  return (
    <>
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
        </div>

        <button type="submit" className={styles.submitBtn}>Entrar</button>
      </form>

        <div className={styles.horizontalDivider}></div>

      <p><a href="/register">Não tem cadastro ? Crie uma conta</a></p>
    </div>

    </div>
    </>
  );
}