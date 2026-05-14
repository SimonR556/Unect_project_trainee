import { useState } from 'react';
import styles from './Card.module.css';
import moreIcon from './img/more.svg'; 
import arrowIcon from './img/Proximo.svg'; 
import trashIcon from './img/lixeira.svg';

interface CardProps {
  title: string;
  description: string; 
  status: 'A fazer' | 'Em andamento' | 'Feito';
  onMove: () => void;
  onDelete: () => void;
}

export function Card({ title, description, status, onMove, onDelete }: CardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className={styles.cardContainer}>
        
        <div className={styles.cardHeader}>
            <h3>{title}</h3>
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
            {status !== 'Feito' && (
                <button className={styles.moveBtn} onClick={onMove}>
                    <img src={arrowIcon} alt="Mover tarefa" />
                </button>
            )}
        </div>

        </div>
  );
}