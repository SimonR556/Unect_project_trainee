import { useState } from 'react';
import eyeClosed from './img/olho_fechado.svg';
import eyeOpen from './img/olho_aberto.svg';
import cadastroImg from "./img/cadastro_img.svg";
import styles from "./Cadastro.module.css"

export function Cadastro() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleCadastro = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Tentando cadastrar um usuario",userName,email,password);
    };

    return(
    <>
    <div className={styles.CadastroContainer}> 

        <div className={styles.leftSection}>

        <div className={styles.logoContainer}>
        <h1 className={styles.logo}>uTask 3.0</h1>
        <div className={styles.logoDivider}></div>
        </div>

        <div className={styles.formWrapper}>
         <h2 className={styles.formTitle}>Crie uma conta</h2>

        <form onSubmit={handleCadastro} className={styles.form}>

            <div className={styles.inputGroup}>
            <label htmlFor="userName">Nome de usuário</label>
            <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu nome de usuário"
                required
                />
                </div>

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
                            <img src={showPassword ? eyeOpen : eyeClosed} alt="mostrar senha" />
                        </button>
                </div>
            </div>
            
            <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirme a senha</label>
                <div className={styles.passwordWrapper}>
                 <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Senha secreta"
                    required
                 />

                <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <img src={showConfirmPassword ? eyeOpen : eyeClosed}alt="Mostrar senha" />
                    </button>
                </div>  
            </div>

            <button type="submit" className={styles.submitBtn}>Criar Cadastro</button>
            </form>
          </div>
        </div>

            <div className={styles.verticalDivider}></div>


        <div className={styles.imageSection}>
            <img src={cadastroImg} alt="pessoa visualizando tarefas" className={styles.cadastroImg}/>
        </div>
    </div>
    </>
    )
}
