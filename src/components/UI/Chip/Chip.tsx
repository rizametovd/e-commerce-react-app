import classes from './Chip.module.css'

interface IChipProps {
    text: string;
    mode?: 'info' | 'attention' | 'highlighted' | 'plain'
}

const Chip: React.FC<IChipProps> = ({text, mode='info'}) => {
    return <span className={`${classes.chip} ${classes[mode]}`}>{text}</span>
}

export default Chip;