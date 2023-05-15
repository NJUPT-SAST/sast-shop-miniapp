type pickerProps = {
    title: string,
    typeSetter: React.SetStateAction<any>
    pickerConfig: {
        selector: string[],
        selectorChecked: number
    }
}