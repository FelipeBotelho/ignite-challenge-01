import { Check, Trash } from "phosphor-react";
import { TodoListItem } from "../App";
import styles from "./Todo.module.css";

interface TodoItemProps {
	data: TodoListItem;
	removeFn: (id: string) => void;
	toogleStatus: ({ id, value }: { id: string; value: boolean }) => void;
}

export function Todo({ data, removeFn, toogleStatus }: TodoItemProps) {
	function handleToogle() {
		toogleStatus({ id: data.id, value: !data.isDone });
    
	}

	function handleRemove() {
		removeFn(data.id);
	}

	return (
		<div className={styles.todo}>
			<div>
				<label htmlFor="checkbox" onClick={handleToogle}>
					<input readOnly type="checkbox" checked={data.isDone} />
					<span className={`${styles.checkbox} ${data.isDone ? styles.checkboxChecked : styles.checkboxUnchecked}`}>{data.isDone && <Check size={12} />}</span>

					<p className={`${styles.paragraph} ${data.isDone ? styles.paragraphChecked : ""}`}>{data.text}</p>
				</label>
			</div>
			<button onClick={handleRemove}>
				<Trash size={16} color="#808080" />
			</button>
		</div>
	);
}
