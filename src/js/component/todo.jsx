
import React, { useState, useEffect } from "react";

function ListItems() {
	const [textValue, setTextValue] = useState("");
	const [todos, setlistItems] = useState([]);

	const createUser = () => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify([])
		};

		fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
			.then(response => response.json())
			.then(response => {
				getAllTask()
			})
			.catch(err => console.error(err));
	}

	const getAllTask = () => {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`)
			.then(response => {
				if (response.ok) {
					return response.json;
				}
				else {
					if (response.status === 404) {
						createUser();
					} else {
						console.error("error en la solicitud", response.status)
					}
				}
			})
			.then(data => {
				setlistItems(data)
			})
			.catch(err => {
				console.error(err)
			});
	}

	const deleteTask = (id) => {
		const updateList = todos.filter((task) => task.id !== id)
		setlistItems(updateList)
		if (updateList.length === 0) {
			const defaultTask = {
				id: 1,
				label: "default task",
				done: false
			}
			updateList.push(defaultTask)
		}
		const options = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updateList)
		}

		fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
			.then(response => response.json())
			.then(response => {
				getAllTask()
			})
			.catch(err => console.error(err));
	}

const addTask = (value) => {
	const newTask = {
		label:value,
		done:false,
	}
	const updateTask = [...todos, newTask]
	const options = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updateTask)
	}

	fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
		.then(response => response.json())
		.then(response => {
			setTextValue("")
			getAllTask()
		})
		.catch(err => console.error(err));
}


	useEffect(() => {
		getAllTask();
	}, [])


	return (
		<>
			<h1>todos</h1>
			<div className="todo-list">
				<input
					type="text"
					placeholder="What needs to be done?"
					onChange={e => setTextValue(e.target.value)}
					onKeyUp={(e) =>{
						if (e.key === "Enter"){
							addTask(textValue)
						}
					}}
					value={textValue}
				></input>
				{
					todos.map((item) =>{
						return(
							<li key={item.id}>
								{
									item.label
								}
								<i className="far fa-times-circle" onClick={() => {
									deleteTask(item.id)
								}}></i>
							</li>
						)
					})
				}
				{/* {todoItems.length > 0 ? (
					<ul className="todo-items">
						{todoItems.map((listItem) => (
							<li
								key={listItem.index}
								onMouseEnter={() => setHoveredIndex(listItem.index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<span>{listItem.label}</span>
								{hoveredIndex === listItem.index && (
									<button
										onClick={() => itemCloseButtonHandler(listItem.index)}
										className="fa fa-trash"
									></button>
								)}
							</li>
						))}
					</ul>
				) : (
					<p>No hay tareas, añadir tareas</p>
				)} */}
				{/* <span>{itemsLeft} items left.</span> */}
			</div>
		</>
	);
}

export default ListItems;