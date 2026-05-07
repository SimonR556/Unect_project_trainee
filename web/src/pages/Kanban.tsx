import { useState } from 'react';
import styles from './Kanban.module.css';
import uLogo from './img/Logo_branca.svg'; 
import sunIcon from './img/[Botão] Light_mode.svg';
import bulbIcon from './img/icone.svg';


export function Kanban(){
const [frase, setFrase] = useState(
    "frase do dia: Thiago, nao desista"
);

return(
    <div className={styles.kanbanContainer}>

        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <img src={uLogo} alt="logo uTask"/>
            </div>

            <h1 className={styles.headerTitle}>uTask 3.0</h1>

            
        </header>
    </div>
)











}