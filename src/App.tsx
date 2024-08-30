import { PlusCircle } from "phosphor-react";
import styles from "./App.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { ListHeader } from "./components/ListHeader";
import { Todo } from "./components/Todo";
import { Header } from "./components/Header";
import { NoContent } from "./components/NoContent";

export interface TodoListItem {
	id: string;
	text: string;
	isDone: boolean;
}

export function App() {

	const [todoList, setTodoList] = useState<TodoListItem[]>([]);

	const [inputValue, setInputValue] = useState("");

	const doneTasks = todoList.reduce((prev, current) => {
		if (current.isDone) return prev + 1;
		return prev;
	}, 0);

	function handleAddTodoItem() {
		if (!inputValue) return;

		const todo: TodoListItem = {
			id: uuidv4(),
			text: inputValue,
			isDone: false,
		};

		setTodoList((prev) => [...prev, todo]);
		setInputValue("");
		console.log(todoList);
	}

	function handleRemoveItem(id: string) {
		const itens = todoList.filter((todoItem) => todoItem.id !== id);

		withReactContent(Swal).fire({
			title: <p>Remover Item</p>,
			background: "#202024",
			color: "#C4C4CC",
			cancelButtonText: "Não",
			confirmButtonText: "Sim",
			confirmButtonColor: "#29292E",
			text: "Tem certeza que deseja remover este ítem?",
			cancelButtonColor: "#202024",
			showCancelButton: true,
			preConfirm: () => {
				setTodoList(itens);
			},
		});
	}

	function handleToggle({ id, value }: { id: string; value: boolean }) {
		const updatedItems = todoList.map((todoItem) => {
			if (todoItem.id === id) {
				return { ...todoItem, isDone: value };
			}
			return { ...todoItem };
		});
		console.log(updatedItems);
		setTodoList(updatedItems);
	}

	return (
		<main>
			<Header />
			<section className={styles.content}>
				<div className={styles.taskCreationContainer}>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className={styles.creationInput} type="text" />
					<button onClick={handleAddTodoItem} disabled={inputValue.length === 0} className={styles.creationButton}>
						Criar
						<PlusCircle size={16} color="#f2f2f2" weight="bold" />
					</button>
				</div>
				<div className={styles.todoList}>
					<ListHeader allItemsCounter={todoList.length} doneItensCounter={doneTasks} />
					{todoList.length > 0 ? (
						<div>
							{todoList.map((task) => (
								<Todo key={task.id} data={task} removeFn={handleRemoveItem} toogleStatus={handleToggle} />
							))}
						</div>
					) : (
						<NoContent />
					)}
				</div>
			</section>
		</main>
	);
}
