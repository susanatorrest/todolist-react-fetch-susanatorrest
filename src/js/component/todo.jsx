
import React, { useState, useEffect } from "react";

function ListItems(props) {
    const [textValue, setTextValue] = useState("");
    const [todos, setlistItems] = useState(props.listItems);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
		const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.1' } };

		fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(data => {
				setlistItems(data)
			})
			.catch(err => {
				if (err.message.includes("NOT FOUND")) {
					const options = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1' },
						body: JSON.stringify(todos)
					};

					fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
						.then(response => response.json())
						.then(response => console.log(response))
						.catch(err => console.error(err));
				}

				console.error(err)
			});
	}, [])

    function itemCloseButtonHandler(index) {
        let nextTodos = [...todos];
        nextTodos.splice(index, 1);
        setlistItems(nextTodos);
        setHoveredIndex(null);
        const options = {
										method: 'PUT',
										headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1' },
										body: JSON.stringify(nextTodos)
									};

									fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
										.then(response => response.json())
										.then(data => {
											const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.1' } };

											fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
												.then(response => response.json())
												.then(retrievedTasks => {
													setNewTask("")
													setHoveredIndex(retrievedTasks)
												})
												.catch(err => console.error(err));

										})
										.catch(err => console.error(err));
								}

    function onKeyUpHandler(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            let nextTodos = [...todos, { label: e.target.value, done: false }];
            setlistItems(nextTodos);
            setTextValue("");
        }
        const options = {
										method: 'PUT',
										headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1' },
										body: JSON.stringify(nextTodos)
									};

									fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
										.then(response => response.json())
										.then(data => {
											const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.1' } };

											fetch(`https://playground.4geeks.com/apis/fake/todos/user/susanatorrest`, options)
												.then(response => response.json())
												.then(retrievedTasks => {
													setTextValue("")
													setlistItems(retrievedTasks)
												})
												.catch(err => console.error(err));

										})
										.catch(err => console.error(err));
								}

    let listItemsWithIndex = todos.map((e, i) => {
        e.index = i;
        return e;
    });

    let todoItems = listItemsWithIndex.filter(e => !e.done);
    let itemsLeft = todos.reduce((a, c) => (a += c.done ? 0 : 1), 0);

    return (
        <>
            <h1>todos</h1>
            <div className="todo-list">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    onChange={e => setTextValue(e.target.value)}
                    onKeyUp={onKeyUpHandler}
                    value={textValue}
                ></input>
                {todoItems.length > 0 ? (
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
                )}
                <span>{itemsLeft} items left.</span>
            </div>
        </>
    );
}

export default ListItems;