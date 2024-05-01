export default function InputWidget({inputType, inputName, labelText, placeholderText, changeCallBack, isValid}) {
    const inputId = `input-${inputName}`
    
    function registerChange(event) {
        const updatedValue = event.target.value;
        changeCallBack(updatedValue);
    }
    
    return (
        <div className="input-widget">
            <label htmlFor={inputId}>{labelText} :</label>
            <input id={inputId} type={inputType} name={inputName} placeholder={placeholderText} onChange={registerChange}/> 
        </div>
        
    )
}