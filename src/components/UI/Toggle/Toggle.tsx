import classes from './Toggle.module.css';

interface IToggleProps {
    value: boolean,
    onChange: () => void
}

const Toggle: React.FC<IToggleProps> = ({value, onChange}) => {

    return (
        <label className={classes.toggle}>
            <input type="checkbox" className={classes.input} checked={value} onChange={onChange} />
            <span className={classes.slider}></span>
        </label>
    )
}

export default Toggle;