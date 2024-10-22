function FormLabel({ title = '', description = '' }) {
    return <div className="border m-4 p-4">
        Edit Form Label component [with variant & styles]
        <hr />
        <span>{title}</span>
        <div>{description}</div>
    </div>

}

export default FormLabel;