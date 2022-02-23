// ¿QUÉ ES UN HOOK?
// ES UNA FUNCIÓN QUE SE ENCUENTRA NATIVA EN REACT LA CUAL PUEDE AYUDARNOS A RESOLVER UN PROBLEMA DE DATOS ESPECÍFICO.

import { useState } from 'react'
import { nanoid } from "nanoid"

export default function Main() {

	const [newComment, setNewComment] = useState({
		subject: "",
		content: "",
		author: ""
	})

	const [list, setList] = useState([])

	const [error, setError] = useState("")

	const [id, setId] = useState("")

	const [editionMode, setEditionMode] = useState(false)

	const handleChange = (event) => {
		console.log(event.target.value)
		console.log("hola")
		console.log("El campo de texto en el que estás escribiendo es:", event.target.name)

		setNewComment({
			...newComment, // spread operator ES6+ - Object Assign
			id: nanoid(),
		 	[event.target.name]: event.target.value
		})
	}

	const handleSubmit = (event) => {
		
		event.preventDefault() // DETENER LA RECARGA DE PÁGINA

		if(!newComment.subject || !newComment.content || !newComment.author) {

			setError("Existe un campo vacío. Por favor, verifica nuevamente.")

			return
		}
		setList([
			...list,
			newComment
		])

		setNewComment({
			subject: "",
			content: "",
			author: ""
		})

		setError("")

	}

	const deleteComment = (id) => {

		console.log(id)

		// ENCONTRAR EL ELEMENTO DENTRO DEL LISTADO Y SACARLO DE AHÍ
		//		        A
		// list => [*,*,A,*,*]
		// devolvamos la nueva lista [*,*,*,*]

		const filteredComments = list.filter((item) => {
			return item.id !== id
		})

		return setList(filteredComments)
		
	}

	const editComment = (element) => {
		
		setEditionMode(true)
		
		setNewComment({
			id: element.id,
			subject: element.subject,
			content: element.content,
			author: element.author
		})

		setId(element.id)

	}
    const handleSubmitEdit = (event) => {

        //Evitar la recarga de pagina
        event.preventDefault()
        //Validacion de campos vacios

        //Editar el elemento dentro de la lista
        //Luego modificar el elemento de la lista
        //Retorno y guardarlo en un arreglo filtrado nuevo
        const filteredArray = list.map((item) => {
            return item.id ===id ? {
                id:id,
                subject:newComment.subject,
                content:newComment.content,
                author: newComment.author
            }: item

        })

        console.log(filteredArray)
        setList(filteredArray)
        setEditionMode(false)
        setNewComment({
            subject: "",
            content: "",
            author: ""
        })


    }

	return (
		<>
			<h1>Sección de comentarios</h1>

			<div className={editionMode ? "max-w-5xl mx-auto px-6 pb-6 bg-yellow-100" : "" }>

				<form onSubmit={ 
					editionMode ? 
						(evt) => { handleSubmitEdit(evt) } 
						: 
						(evt) => { handleSubmit(evt) } 
					} 
				>

					<label>Asunto</label>
					<input 
						name="subject"
						value={newComment.subject}
						className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
						onChange={ evt => { handleChange(evt) }}
					/>

					<label>Comentario</label>
					<input 
						name="content"
						value={newComment.content}
						className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
						onChange={ evt => { handleChange(evt) }} 
					/>
					
					<label>Autor</label>
					<input 
						name="author"
						value={newComment.author}
						className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
						onChange={ evt => { handleChange(evt) } }
					/>

					{
						editionMode ? 
						<button type="submit">Editar comentario</button>
						:
						<button type="submit">Crear comentario</button>
					}

					<p>{ error }</p>


				</form>
			</div>


			<h2>Listado de comentarios</h2>


			{
				list.length === 0 ? 
					<p>No hay publicaciones</p> 
				:
					list.map((elt, index) => {
						return (
							<div className="mb-4 bg-blue-600 text-white" key={index}>
								<h3>{elt.subject}</h3>
								<span>Escrito por: {elt.author}</span>
								<p>{elt.content}</p>

								<button 
									onClick={() => editComment(elt)} 
								>Editar</button>
								<button 
									onClick={() => { deleteComment(elt.id) }}>
										Borrar
								</button>
							</div>
						)
					})
			}


		</>
	)
}