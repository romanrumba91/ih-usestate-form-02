// ¿QUÉ ES UN HOOK?
// ES UNA FUNCIÓN QUE SE ENCUENTRA NATIVA EN REACT LA CUAL PUEDE AYUDARNOS A RESOLVER UN PROBLEMA DE DATOS ESPECÍFICO.

import { useState } from 'react'

export default function Main() {

	//			Invocación de useState con un argumento de estado inicial.
	// const [data, setData] = useState({
	// 	nombre: "mike"
	// }) // => [***, () => {}]

	// const changeName = () => {
	// 	setData({
	// 		nombre: "mike nieva"
	// 	})
	// }
    // const [soda, setSoda] = useState({
	// 	soda: "pepsi"
	// }) // => [***, () => {}]

	// const changeSoda = () => {
	// 	setSoda({
	// 		soda: "coca cola"
	// 	})
	// }

    const [newComment,setNewComment] = useState({
        subject:'',
        content:'',
        author: ""
    }) 

    const [list, setList] = useState([])

    const [error, SetError] = useState('')

    const handleChange = (evt) => {
        console.log(evt.target.value)
        console.log("hola")
        console.log(evt.target.name)
        
        setNewComment({
            // Keep newComment ...new Comment SpreadOperator es6
            ...newComment,
            [evt.target.name]: evt.target.value
        })
    }

    const handleSumbit = (evt) => {
        evt.preventDefault() // DETENER RECARGA DE PAGINA

        if(!newComment.subject || !newComment.content || !newComment.author){
            SetError("Existe un campo vacio")
            return 
        }
        setList([
            ...list,
            newComment
        ])

        setNewComment({
            subject:'',
            content:'',
            author: ''
        })
        SetError('')
    }

	return (
		<>
			<h1>Sección de comentarios</h1>

			<form onSubmit={(evt) => {handleSumbit(evt)} }>

				<label>Asunto</label>
				<input 
					name="subject"
					value={newComment.subject}
					onChange={ evt => { handleChange(evt) }}
				/>

				<label>Comentario</label>
				<input 
					name="content"
					value={newComment.content}
					onChange={ evt => { handleChange(evt) }} 
				/>
				
				<label>Autor</label>
				<input 
					name="author"
					value={newComment.author}
					onChange={ evt => { handleChange(evt) } }
				/>

				<button type="submit">Crear comentario</button>
                <p>{error}</p>

			</form>

            <h2>Listado de comentarios</h2>
            {
                list.length === 0 ? 
                <p>No hay publicaciones</p>
                :

                    list.map((elt,index)=> {
                        return(
                            <div key={index}>
                                <h3>{elt.subject}</h3>
                                <span>Escrito por: {elt.author}</span>
                                <p>{elt.content}</p>
                            </div>
                        )
                    })
            }

		</>
	)
}