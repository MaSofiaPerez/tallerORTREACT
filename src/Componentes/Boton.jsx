import {Button} from 'react-bootstrap'

const Boton = ({onClick, name, disabled, variant, size}) => {
  return (
    <div className="d-grid gap-2">
    <Button variant={variant} onClick={onClick} disabled={disabled} size={size}>
      {name}
    </Button>
  </div>
  )
}

export default Boton