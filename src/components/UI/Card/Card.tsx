import classes from './Card.module.css';

interface ICardProps {
    children: JSX.Element,
    fullWidth?: boolean
}

const Card: React.FC<ICardProps> = ({children, fullWidth = false}) => {
    return (
        <div className={`${classes.card} ${fullWidth && classes['full-width']}`}>{children}</div>
    )
}

export default Card;