import { useState, useEffect } from 'react';
import styles from './Kanban.module.css';
import uLogo from './img/Logo_branca.svg'; 
import sunIcon from './img/Light_mode.svg';
import bulbIcon from './img/icone.svg';
import add from './img/Adicionar_task.svg';
import { Card } from './Card';
import { ModalTask } from './ModalTask';
import { api } from '../services/api'

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'A fazer' | 'Em andamento' | 'Feito'
}

export function Kanban(){
const [isModalOpen, setIsModalOpen] = useState(false);
const [frase, setFrase] = useState("Buscando inspiração para o seu dia...");
const [tasks, setTasks] = useState<Task[]>([]);

useEffect(() => {
    api.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar as tarefas do banco:", error);
      });
  }, []);

  useEffect(() => {
        const fetchFraseDoDia = async () => {
            try {
                const adviceResponse = await fetch('https://api.adviceslip.com/advice');
                const adviceData = await adviceResponse.json();
                const fraseEmIngles = adviceData.slip.advice;
                const translateUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fraseEmIngles)}&langpair=en|pt`;
                const translateResponse = await fetch(translateUrl);
                const translateData = await translateResponse.json();
                if (translateData && translateData.responseData) {
                    setFrase(translateData.responseData.translatedText);
                } else {
                    setFrase(fraseEmIngles); 
                }
            } catch (error) {
                console.error("Erro ao buscar ou traduzir a frase:", error);
                setFrase("Acredite no processo e não desista!");
            }
        };

        fetchFraseDoDia();
    }, []);

  const handleAddTask = async (title: string, description: string) => {
    try {
      const response = await api.post('/tasks', { 
        title, 
        description 
      });

      const newTask = response.data;

      setTasks(tarefasAtuais => [...tarefasAtuais, newTask]);
      setIsModalOpen(false);

    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

const handleMoveTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let newStatus = task.status;
    if (task.status === 'A fazer') newStatus = 'Em andamento';
    else if (task.status === 'Em andamento') newStatus = 'Feito';

    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tarefasAtuais =>
        tarefasAtuais.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Erro ao mover a tarefa:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tarefasAtuais => tarefasAtuais.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

return(
    <div className={styles.kanbanContainer}>

        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <img src={uLogo} alt="logo uTask"/>
            </div>

            <h1 className={styles.headerTitle}>uTask 3.0</h1>

            <div className={styles.headerRight}>
                <button className={styles.themeToggle}>
                    <img src={sunIcon} alt="mudar tema"/>
                </button>
            </div>
        </header>

        <main className={styles.mainContent}>

            <section className={styles.quoteCard}>
                <img src={bulbIcon} alt="lâmpada" className={styles.bulbIcon}/>
                <div className={styles.quoteText}>
                    <h2>Frase do dia</h2>
                    <p>{frase}</p>
                </div>
            </section>

            <section className={styles.boardArea}>
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <h2>A fazer</h2>
                        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
                            <img src={add} alt='adicionar task'/>
                        </button>
                    </div>
                    <div className={styles.columnContent}>
                        {tasks
                            .filter(task => task.status === 'A fazer')
                            .map(task => (
                                    <Card
                                    key={task.id}
                                    title={task.title}
                                    description={task.description}
                                    status={task.status}
                                    onMove={() => handleMoveTask(task.id)}
                                    onDelete={() => handleDeleteTask(task.id)}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <h2>Em andamento</h2>
                    </div>
                    <div className={styles.columnContent}>
                       {tasks
                            .filter(task => task.status === 'Em andamento') // Filtra Em andamento
                            .map(task => (
                                    <Card
                                    key={task.id}
                                    title={task.title}
                                    description={task.description}
                                    status={task.status} 
                                    onMove={() => handleMoveTask(task.id)} 
                                    onDelete={() => handleDeleteTask(task.id)}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <h2>Feito</h2>
                    </div>
                    <div className={styles.columnContent}>
                        {tasks
                            .filter(task => task.status === 'Feito') 
                            .map(task => (
                                    <Card
                                    key={task.id}
                                    title={task.title}
                                    description={task.description}
                                    status={task.status} 
                                    onMove={() => handleMoveTask(task.id)}
                                    onDelete={() => handleDeleteTask(task.id)}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>

        </main>

        {isModalOpen && <ModalTask onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask}/>}
        
        <footer className={styles.footer}>
            <p>© Processo de Trainee <strong>Unect Jr.</strong></p>
            <p>Feito com ❤️ por <strong>Thiago Dutra</strong></p>
        </footer>

    </div>
);

}