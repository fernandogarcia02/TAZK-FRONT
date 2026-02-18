const Welcome = () => {
    return (
        <div>
            <h1>¡Bienvenido a tu app de tareas!</h1>
            <p>Organiza tu vida de forma segura y rapida</p>
            <button onClick={()=> window.location.href='/login'}>Get Started</button>
        </div>
    )
};
export default Welcome;