import { useState } from 'react';
import styles from './Card.module.css';
import moreIcon from './img/more.svg'; 
import arrowIcon from './img/Proximo.svg'; 
import arrowIconDark from './img/Proximo_darkmode.svg';
import arrowBackIcon from './img/Anterior.svg';
import arrowBackIconDark from './img/Anterior_darkmode.svg';
import trashIcon from './img/lixeira.svg';
import restartIcon from './img/Voltar.svg';
import restartIconDark from './img/VoltarDarkMode.svg';
import { useTheme } from '../contexts/ThemeContext';

interface CardProps {
  title: string;
  description: string; 
  status: 'A fazer' | 'Em andamento' | 'Feito';
  onMove: () => void;
  onDelete: () => void;
  onMoveBack: () => void;
  onRestart: () => void;
}

export function Card({ title, description, status, onMove, onDelete, onMoveBack, onRestart }: CardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDarkMode } = useTheme();
    return (
        <div className={styles.cardContainer}>
        
        <div className={styles.cardHeader}>
            <h3 className={status === 'Feito' ? styles.completedTitle : ''}>{title}</h3>
            <div className={styles.moreMenuContainer}>
                <button 
                    className={styles.iconBtn} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                >
                    <img src={moreIcon} alt="Opções" />
                </button>

                {isMenuOpen && (
                    <div className={styles.dropdownMenu}>
                        <button className={styles.deleteMenuBtn} onClick={() => {onDelete();
                            setIsMenuOpen(false);
                        }}>
                            <img src={trashIcon} alt="Lixeira" />
                            Excluir
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className={styles.cardBody}>
            <button 
                className={`${styles.descriptionToggle} ${isExpanded ? styles.expanded : ''}`} 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Esconder descrição ⌃' : 'Ler descrição ⌵'}
            </button>

            {isExpanded && (
                <p className={styles.descriptionText}>{description}</p>
            )}
        </div>

        <div className={styles.cardFooter}>
            {status !== 'A fazer' && (
                <button className={styles.moveBtnBack} onClick={onMoveBack}>
                    <img src={isDarkMode ? arrowBackIconDark : arrowBackIcon} alt="Voltar tarefa" />
                </button>
            )}
            
            {status !== 'Feito' && (
                <button className={styles.moveBtn} onClick={onMove}>
                    <img src={isDarkMode ? arrowIconDark : arrowIcon} alt="Mover tarefa" />
                </button>
            )}

            {status === 'Feito' && (
                <button className={styles.moveBtn} onClick={onRestart}>
                    <img src={isDarkMode ? restartIconDark : restartIcon} alt="Reiniciar tarefa" />
                </button>
            )}
        </div>
        </div>
  );
}