import StoreAdd from './StoreAdd'
import StoreGameList from './StoreGameList'
import StoreInformation from './StoreInformation'
import Swal from 'sweetalert2'
const Select = ({
  register,
  errors,
  id,
  idText,
  rules,
  children,
  disabled,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {idText}
      </label>
      <select
        disabled={disabled}
        id={id}
        {...register(id, rules)}
        className={`form-select ${errors[id] ? 'is-invalid' : ''}`}
      >
        {children}
      </select>
      {errors[id] && (
        <div id="validationServer03Feedback" className="invalid-feedback">
          {errors[id]?.message}
        </div>
      )}
    </>
  )
}
const Input = ({
  register,
  errors,
  id,
  idText,
  type,
  rules,
  placeholder = '',
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {idText}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control ${errors[id] && 'is-invalid'}`}
        name={id}
        {...register(id, rules)}
        placeholder={placeholder}
      />
      {errors[id] && (
        <div id="validationServer03Feedback" className="invalid-feedback">
          {errors[id]?.message}
        </div>
      )}
    </>
  )
}
const swalAlert = (title, text, icon, button) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: button,
  })
}

export { StoreAdd, StoreGameList, StoreInformation, Select, Input, swalAlert }
