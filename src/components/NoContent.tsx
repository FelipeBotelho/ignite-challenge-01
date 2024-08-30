import styles from "./NoContent.module.css";
import clipboard from '../assets/clipboard.png'

export function NoContent() {
	return (
		<div className={styles.noContent}>
			<img src={clipboard} alt="ícone de prancheta" />
			<p>
				<strong>Você ainda não tem tarefas cadastradas</strong>
				Crie tarefas e organize seus itens a fazer
			</p>
		</div>
	);
}
