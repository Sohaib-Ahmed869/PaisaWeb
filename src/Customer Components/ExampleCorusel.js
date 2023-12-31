import image from './12.jpg';
import './Corusel.css';

const ExampleCorusel = () => {
    return (
        <div>
            <img className='Image' src={image} alt="First slide" />
        </div>
    )
}

export default ExampleCorusel;