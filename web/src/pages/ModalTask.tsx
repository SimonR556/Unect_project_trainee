import { useState } from 'react';
import styles from './ModalTask.module.css';
import closeIcon from './img/Fechar.svg'; 

interface ModalTaskProps {
  onClose: () => void;
  onAddTask: (title: string, description: string) => void; 
}

export function ModalTask({ onClose, onAddTask }: ModalTaskProps) {
  const [tempTitle, setTempTitle] = useState('');
  const [tempDescription, setTempDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(tempTitle, tempDescription);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        
        <button className={styles.closeBtn} onClick={onClose}>
          <img src={closeIcon} alt="Fechar" />
        </button>

        <h2 className={styles.modalTitle}>Nova Task</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Título *</label>
            <input 
              type="text" 
              placeholder="Título da tarefa" 
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Descrição</label>
            <textarea 
              placeholder="Descreva a tarefa..." 
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.createBtn}>Criar task</button>
        </form>

      </div>
    </div>
  );
}