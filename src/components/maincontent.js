import React from "react"

export default function MainContent(){
    const [meme, setMeme] = React.useState(
        {
            "topText": "",
            "bottomText":"",
            "image": "https://i.imgflip.com/1g8my4.jpg"
        }
    )
    
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then (resp => resp.json())
            .then (data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage(){
        let randomNum = Math.floor(Math.random()*allMemes.length)
        
        const url = allMemes[randomNum].url
        setMeme( prevState => ({
            ...prevState, 
            "image": url
        }
    ))
    }

    function valueChange(event){
        setMeme(prevMeme => ({
            ...prevMeme, 
            [event.target.name]: event.target.value
        }))
    }

    return(<div className="MemeComp">
        <div className="form">
            <input className = "get" name = "topText" type='text' placeholder="top text" onChange = {valueChange}></input>
            <input className = "get" name="bottomText" type='text' placeholder="bottom text" onChange={valueChange}></input>
            <button onClick = {getMemeImage} className = "gett">Get a new meme image  🖼</button>
        </div>
        <div className="Meme">
        <img className = "meme--image"src={meme.image}></img>
        <h1 className="topText">{meme.topText}</h1>
        <h1 className="bottomText">{meme.bottomText}</h1>
        </div>
    </div>)
}