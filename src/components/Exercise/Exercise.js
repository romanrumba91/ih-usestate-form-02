import React from 'react'
import { nanoid } from "nanoid"
import { useState } from 'react'

export default function Exercise() {

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

  <h1>Movies</h1>

      <div className={editionMode ? "max-w-5xl mx-auto px-6 pb-6 bg-yellow-100" : "" }>

          <form onSubmit={ 
            editionMode ? 
              (evt) => { handleSubmitEdit(evt) } 
              : 
              (evt) => { handleSubmit(evt) } 
            } 
            >
                <div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                        <label class="block text-sm font-medium text-gray-900" >Movie</label>
                        <input 
                              name="subject" class="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              value={newComment.subject}
						                  className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
						                  onChange={ evt => { handleChange(evt) }}
                        />
                        
                        <label class="block text-sm font-medium text-gray-900" >Description</label>
                        <input 
                              name="content" class="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              value={newComment.content}
						                  className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
						                  onChange={ evt => { handleChange(evt) }} 
                        />

                        <label class="block text-sm font-medium text-gray-900" >Author</label>
                        <input 
                        name="author" class="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        value={newComment.author}
						            className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
						            onChange={ evt => { handleChange(evt) } }
                        />
                        <br></br>
                      {
                         

                            editionMode ? 
                            <div className='sep'>
                            <button type="submit" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style="margin-left: 10" >Editar comentario</button>
                            </div>
                            :
                            <div className='sep'>
                            <button type="submit" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Crear comentario</button>
                            </div>
					            }

					            <p>{ error }</p>
                </div>

          </form>
			</div>
      <div className='sep'>
			<b><h2>Listado de comentarios</h2></b>
      <br></br>                
                    
			{
				list.length === 0 ? 
					<p>No hay publicaciones</p> 
				:
					list.map((elt, index) => {
						return (
							<div className="mb-4 bg-white text-black" key={index}>
								<h3>Nombre de la pelicula: {elt.subject}</h3>
								<span>Descripcion de la pelicula: {elt.author}</span>
								<p>Author de la pelicula: {elt.content}</p>
                <br></br>
                
                <div className='sep'>
								  <button 
                    onClick={() => editComment(elt)} class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                  Editar</button>
                
                  
                  <button 
                    onClick={() => { deleteComment(elt.id) }} class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Borrar
                  </button>
                </div>
                
							</div>
						)
					})
			}
      </div>  




  </>

  )
}
