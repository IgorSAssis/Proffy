import React from "react";

import "./styles.css";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

function TeacherItem () {
    return (
        <article className="teacher-item">
        <header>
            <img alt="Igor" src="https://avatars3.githubusercontent.com/u/53535028?s=460&u=5c8d9211e92350617aa6604ac57445a7dffdfa8b&v=4"></img>
            <div>
                <strong>Igor IA.</strong>
                <span>Química</span>
            </div>
        </header>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Etiam eget ligula eu lectus lobortis condimentum. 
            Aliquam nonummy auctor massa. 
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus.
            Nam mattis, felis ut adipiscing."
        </p>
        <footer>
            <p>
                Preço/hora: 
                <strong>R$ 20,00</strong>
            </p>
            <button type="submit">
                <img alt="Whatsapp icon" src={ whatsappIcon }/>
                Entrar em contato
            </button>
        </footer>
    </article>

    )
}

export default TeacherItem;