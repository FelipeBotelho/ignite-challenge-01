import styles from './ListHeader.module.css'

interface Props {
  allItemsCounter: number
  doneItensCounter: number
}

export function ListHeader({ allItemsCounter, doneItensCounter }: Props) {
  return (
    <header className={styles.header}>
      <aside className={styles.allTasks}>
        <p>Tarefas criadas</p>
        <span>{allItemsCounter}</span>
      </aside>

      <aside className={styles.completed}>
        <p>Concluídas</p>
        <span>
          {allItemsCounter === 0
            ? allItemsCounter
            : `${doneItensCounter} de ${allItemsCounter}`}
        </span>
      </aside>
    </header>
  )
}