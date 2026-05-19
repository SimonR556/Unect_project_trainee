import { useState, useEffect } from 'react';
import styles from './Kanban.module.css';
import uLogo from './img/Logo_branca.svg'; 
import uLogoDark from './img/Logo_azul.svg'
import sunIcon from './img/Light_mode.svg';
import moonIcon from './img/Dark_mode.svg';
import bulbIcon from './img/icone.svg';
import bulbIconDark from './img/Icone_darkmode.svg';
import add from './img/Adicionar_task.svg';
import { Card } from './Card';
import { ModalTask } from './ModalTask';
import { api } from '../services/api'
import { useTheme } from '../contexts/ThemeContext';

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
const { isDarkMode, toggleTheme } = useTheme();
const [mobileColumnIndex, setMobileColumnIndex] = useState(0);

const handleNextColumn = () => {
    setMobileColumnIndex(prevIndex => (prevIndex < 2 ? prevIndex + 1 : prevIndex));
};

const handlePrevColumn = () => {
    setMobileColumnIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
};

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

const handleMoveTaskBack = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

     let newStatus = task.status;
    if (task.status === 'Feito') newStatus = 'Em andamento';
    else if (task.status === 'Em andamento') newStatus = 'A fazer'; 

    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tarefasAtuais =>
        tarefasAtuais.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Erro ao voltar a tarefa:", error);
    }
};

const handleRestartTask = async (taskId: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: 'A fazer' });
      
      setTasks(tarefasAtuais =>
        tarefasAtuais.map(t => (t.id === taskId ? { ...t, status: 'A fazer' } : t))
      );
    } catch (error) {
      console.error("Erro ao reiniciar a tarefa:", error);
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
                <img src={isDarkMode ? uLogoDark : uLogo} alt="logo uTask"/>
            </div>

            <h1 className={styles.headerTitle}>uTask 3.0</h1>

            <div className={styles.headerRight}>
                <button 
                  className={`${styles.themeToggle} ${isDarkMode ? styles.darkActive : ''}`} 
                  onClick={toggleTheme}
                  aria-label="Alternar tema"
                >
                    <div className={styles.toggleCircle}>
                        <img 
                          src={isDarkMode ? moonIcon : sunIcon} 
                          alt={isDarkMode ? "Modo escuro" : "Modo claro"}
                        />
                    </div>
                </button>
            </div>
        </header>

        <main className={styles.mainContent}>

            <section className={styles.quoteCard}>
                <img src={isDarkMode ? bulbIconDark : bulbIcon} alt="lâmpada" className={styles.bulbIcon}/>
                <div className={styles.quoteText}>
                    <h2>Frase do dia</h2>
                    <p>{frase}</p>
                </div>
            </section>

            <section
                className={styles.boardArea}
                style={{ transform: `translateX(-${mobileColumnIndex * 33.333}%)` }}
            >
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <button className={styles.carouselBtn} style={{visibility: 'hidden'}}>&lt;</button>

                        <h2>A fazer</h2>

                        <div className={styles.headerRightActions}> 
                            <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
                                <img src={add} alt='adicionar task'/>
                            </button>
                            <button className={styles.carouselBtn} onClick={handleNextColumn}>&gt;</button>
                        </div>
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
                                    onMoveBack={() => handleMoveTaskBack(task.id)}
                                    onRestart={() => handleRestartTask(task.id)}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <button className={styles.carouselBtn} onClick={handlePrevColumn}>&lt;</button>
                        <h2>Em andamento</h2>
                        <button className={styles.carouselBtn} onClick={handleNextColumn}>&gt;</button>
                    </div>
                    <div className={styles.columnContent}>
                       {tasks
                            .filter(task => task.status === 'Em andamento') 
                            .map(task => (
                                    <Card
                                    key={task.id}
                                    title={task.title}
                                    description={task.description}
                                    status={task.status} 
                                    onMove={() => handleMoveTask(task.id)} 
                                    onDelete={() => handleDeleteTask(task.id)}
                                    onMoveBack={() => handleMoveTaskBack(task.id)}
                                    onRestart={() => handleRestartTask(task.id)}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <button className={styles.carouselBtn} onClick={handlePrevColumn}>&lt;</button>
                        <h2>Feito</h2>
                        <button className={styles.carouselBtn} style={{visibility: 'hidden'}}>&gt;</button> 
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
                                    onMoveBack={() => handleMoveTaskBack(task.id)}
                                    onRestart={() => handleRestartTask(task.id)}
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