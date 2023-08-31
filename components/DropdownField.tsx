import { useField } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native'
import FieldBase, { FieldBaseProps} from './FieldBase';

type DropdownFieldProps = FieldBaseProps & {
    name: string
    data: {label: string, value: string}[]
}

export default function DropdownField({ 
    label,
    name,
    data,
}: DropdownFieldProps) {

    const [ value, meta, helpers ] = useField(name)

    const handleChange = (new_value: string) => {
        helpers.setValue(new_value)
    }

    return (
        <FieldBase
            label={label}
            name={name}
        >
            <Dropdown
                style={styles.dropdown}
                data={data}
                labelField='label'
                valueField='value'
                value={meta.value}
                onChange={(data) => handleChange(data.value)}
            />
        </FieldBase>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 32,
        width: 200,
        borderWidth: 1,
        borderColor: '#a8a8a8',
        paddingLeft: 4
    }
})